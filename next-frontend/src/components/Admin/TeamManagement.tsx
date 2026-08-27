"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import ImageCompressor from "@/components/ImageCompressor";
import { deleteFileFromS3 } from "@/services/fileService";
import dashboardStyles from "@/styles/Admin/AdminDashboard.module.css";
import styles from "@/styles/Admin/TeamManagement.module.css";
import { getTeamImageUrl } from "@/lib/teamMembers";
import {
  TEAM_LOCALES,
  TEAM_LOCALE_LABELS,
  type AdminTeamMember,
  type TeamLocale,
  type TeamMemberInput,
  type TeamMemberTranslation,
} from "@/types/teamMember";

const emptyTranslations = (): TeamMemberTranslation[] =>
  TEAM_LOCALES.map((locale) => ({ locale, role: "", shortDescription: "", longDescription: "" }));

const emptyForm = (): TeamMemberInput => ({
  slug: "",
  honorific: "Ms.",
  name: "",
  email: "",
  linkedin: "",
  imagePath: "",
  displayOrder: 0,
  featured: false,
  published: true,
  translations: emptyTranslations(),
});

const slugify = (value: string) =>
  value.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");

const TeamManagement = () => {
  const [members, setMembers] = useState<AdminTeamMember[]>([]);
  const [form, setForm] = useState<TeamMemberInput>(emptyForm);
  const [activeLocale, setActiveLocale] = useState<TeamLocale>("en");
  const [editing, setEditing] = useState<AdminTeamMember | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [pageError, setPageError] = useState("");
  const [formError, setFormError] = useState("");

  const translation = useMemo(
    () => form.translations.find((item) => item.locale === activeLocale)!,
    [activeLocale, form.translations],
  );

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/team-members/admin");
      if (!response.ok) throw new Error("Failed to load team members");
      setMembers(await response.json());
    } catch (requestError) {
      setPageError(requestError instanceof Error ? requestError.message : "Failed to load team members");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchMembers();
  }, []);

  const reset = () => {
    setForm(emptyForm());
    setEditing(null);
    setSelectedFile(null);
    setActiveLocale("en");
    setShowForm(false);
    setFormError("");
  };

  const editMember = (member: AdminTeamMember) => {
    const byLocale = new Map(member.translations.map((item) => [item.locale, item]));
    setForm({
      slug: member.slug,
      honorific: member.honorific,
      name: member.name,
      email: member.email ?? "",
      linkedin: member.linkedin ?? "",
      imagePath: member.imagePath,
      displayOrder: member.displayOrder,
      featured: member.featured,
      published: member.published,
      translations: TEAM_LOCALES.map((locale) => ({
        locale,
        role: byLocale.get(locale)?.role ?? "",
        shortDescription: byLocale.get(locale)?.shortDescription ?? "",
        longDescription: byLocale.get(locale)?.longDescription ?? "",
      })),
    });
    setEditing(member);
    setActiveLocale("en");
    setFormError("");
    setShowForm(true);
  };

  const addMember = () => {
    setForm(emptyForm());
    setEditing(null);
    setSelectedFile(null);
    setActiveLocale("en");
    setFormError("");
    setShowForm(true);
  };

  const updateTranslation = (field: keyof Omit<TeamMemberTranslation, "id" | "locale">, value: string) => {
    setForm((current) => ({
      ...current,
      translations: current.translations.map((item) =>
        item.locale === activeLocale ? { ...item, [field]: value } : item,
      ),
    }));
  };

  const uploadImage = async () => {
    if (!selectedFile) return form.imagePath;
    const query = new URLSearchParams({
      fileType: selectedFile.type,
      fileName: selectedFile.name,
      donorType: "team-members",
    });
    const response = await fetch(`/api/file?${query}`, { method: "POST" });
    if (!response.ok) throw new Error("Unable to prepare image upload");
    const { signedUrl, key } = await response.json();
    const upload = await fetch(signedUrl, {
      method: "PUT",
      headers: { "Content-Type": selectedFile.type },
      body: selectedFile,
    });
    if (!upload.ok) throw new Error("Unable to upload image");
    return key as string;
  };

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    const incompleteTranslation = form.translations.find(
      (item) =>
        !item.role.trim() ||
        !item.shortDescription.trim() ||
        !item.longDescription.trim(),
    );
    if (incompleteTranslation) {
      setActiveLocale(incompleteTranslation.locale);
      setFormError(
        `Complete the job title, short description, and long description for ${TEAM_LOCALE_LABELS[incompleteTranslation.locale]}.`,
      );
      return;
    }

    setSubmitting(true);
    setFormError("");
    let newlyUploadedImage: string | null = null;
    try {
      const imagePath = await uploadImage();
      if (!imagePath) throw new Error("A portrait is required");
      if (selectedFile) newlyUploadedImage = imagePath;
      const endpoint = editing ? `/api/team-members/admin/${editing.id}` : "/api/team-members/admin";
      const response = await fetch(endpoint, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, imagePath }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.error || "Unable to save team member");
      newlyUploadedImage = null;
      await fetchMembers();
      reset();
    } catch (requestError) {
      if (newlyUploadedImage) await deleteFileFromS3(newlyUploadedImage);
      setFormError(requestError instanceof Error ? requestError.message : "Unable to save team member");
    } finally {
      setSubmitting(false);
    }
  };

  const deleteMember = async (member: AdminTeamMember) => {
    if (!window.confirm(`Delete ${member.name}? This cannot be undone.`)) return;
    const response = await fetch(`/api/team-members/admin/${member.id}`, { method: "DELETE" });
    if (response.ok) await fetchMembers();
    else setPageError("Unable to delete team member");
  };

  if (loading) return <div className={dashboardStyles.loading}>Loading team members…</div>;

  return (<div className={dashboardStyles.dashboardContent}>
    <div className={dashboardStyles.pageHeader}>
      <h1>Team Management</h1>
      <button className={dashboardStyles.addButton} onClick={addMember}><FaPlus /> Add Team Member</button>
    </div>

    {pageError && <div className={styles.error} role="alert">{pageError}</div>}

    {showForm && <div className={dashboardStyles.formOverlay}>
      <div className={`${dashboardStyles.formContainer} ${styles.formContainer}`}>
        <h2>{editing ? `Edit ${editing.name}` : "Add Team Member"}</h2>
        {formError && <div className={styles.error} role="alert">{formError}</div>}
        <form onSubmit={submit} className={dashboardStyles.blogForm}>
          <div className={dashboardStyles.formRow}>
            <div className={dashboardStyles.formGroup}>
              <label htmlFor="name">Name</label>
              <input id="name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value, slug: editing ? current.slug : slugify(event.target.value) }))} required />
            </div>
            <div className={dashboardStyles.formGroup}>
              <label htmlFor="honorific">Honorific</label>
              <input id="honorific" value={form.honorific} onChange={(event) => setForm((current) => ({ ...current, honorific: event.target.value }))} required />
            </div>
          </div>
          <div className={dashboardStyles.formRow}>
            <div className={dashboardStyles.formGroup}>
              <label htmlFor="slug">URL slug</label>
              <input id="slug" value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: slugify(event.target.value) }))} required />
            </div>
            <div className={dashboardStyles.formGroup}>
              <label htmlFor="order">Display order</label>
              <input id="order" type="number" min="0" value={form.displayOrder} onChange={(event) => setForm((current) => ({ ...current, displayOrder: Number(event.target.value) }))} required />
            </div>
          </div>
          <div className={dashboardStyles.formRow}>
            <div className={dashboardStyles.formGroup}>
              <label htmlFor="email">Email</label>
              <input id="email" type="email" value={form.email} onChange={(event) => setForm((current) => ({ ...current, email: event.target.value }))} />
            </div>
            <div className={dashboardStyles.formGroup}>
              <label htmlFor="linkedin">LinkedIn URL</label>
              <input id="linkedin" type="url" value={form.linkedin} onChange={(event) => setForm((current) => ({ ...current, linkedin: event.target.value }))} />
            </div>
          </div>
          <div className={styles.checkboxes}>
            <label><input type="checkbox" checked={form.featured} onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))} /> Featured on homepage</label>
            <label><input type="checkbox" checked={form.published} onChange={(event) => setForm((current) => ({ ...current, published: event.target.checked }))} /> Published</label>
          </div>
          <div className={dashboardStyles.formGroup}>
            <ImageCompressor label="Portrait" maxWidth={1200} maxHeight={1600} quality={0.82} onCompressed={setSelectedFile} />
            {form.imagePath && !selectedFile && <Image className={styles.preview} src={getTeamImageUrl(form.imagePath)} alt={form.name || "Current portrait"} width={120} height={120} />}
          </div>

          <div className={styles.localeTabs}>
            {TEAM_LOCALES.map((locale) => <button key={locale} type="button" className={activeLocale === locale ? styles.activeLocale : ""} onClick={() => setActiveLocale(locale)}>{TEAM_LOCALE_LABELS[locale]}</button>)}
          </div>
          <div className={styles.translationPanel} dir={activeLocale === "he" ? "rtl" : "ltr"}>
            <div className={dashboardStyles.formGroup}>
              <label htmlFor="role">Job title ({TEAM_LOCALE_LABELS[activeLocale]})</label>
              <input id="role" value={translation.role} onChange={(event) => updateTranslation("role", event.target.value)} required />
            </div>
            <div className={dashboardStyles.formGroup}>
              <label htmlFor="shortDescription">Short description</label>
              <textarea id="shortDescription" rows={3} value={translation.shortDescription} onChange={(event) => updateTranslation("shortDescription", event.target.value)} required />
            </div>
            <div className={dashboardStyles.formGroup}>
              <label htmlFor="longDescription">Long description</label>
              <textarea id="longDescription" rows={12} value={translation.longDescription} onChange={(event) => updateTranslation("longDescription", event.target.value)} required />
            </div>
          </div>

          <div className={dashboardStyles.formActions}>
            <button className={dashboardStyles.saveButton} disabled={submitting}>{submitting ? "Saving…" : editing ? "Update Member" : "Create Member"}</button>
            <button type="button" className={dashboardStyles.cancelButton} onClick={reset}>Cancel</button>
          </div>
        </form>
      </div>
    </div>}

    <div className={dashboardStyles.blogTable}>
      <table>
        <thead><tr><th>Order</th><th>Portrait</th><th>Name</th><th>English role</th><th>Status</th><th>Actions</th></tr></thead>
        <tbody>{members.map((member) => <tr key={member.id}>
          <td>{member.displayOrder}</td>
          <td><Image className={dashboardStyles.profileImage} src={getTeamImageUrl(member.imagePath)} alt={member.name} width={76} height={76} /></td>
          <td>{member.honorific} {member.name}</td>
          <td>{member.translations.find((item) => item.locale === "en")?.role}</td>
          <td>{member.published ? "Published" : "Draft"}{member.featured ? " · Featured" : ""}</td>
          <td><div className={dashboardStyles.actionButtons}>
            <button className={dashboardStyles.actionBtn} onClick={() => editMember(member)} title="Edit"><FaEdit /></button>
            <button className={`${dashboardStyles.actionBtn} ${dashboardStyles.deleteBtn}`} onClick={() => deleteMember(member)} title="Delete"><FaTrash /></button>
          </div></td>
        </tr>)}</tbody>
      </table>
    </div>
  </div>);
};

export default TeamManagement;

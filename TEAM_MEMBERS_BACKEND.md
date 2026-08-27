# Team member management

Team members are managed from `/admin/team`. Shared profile fields live in
`TeamMember`; localized job titles and biographies live in
`TeamMemberTranslation`.

## API

- `GET /api/team-members?locale=ka&featured=true` — published members
- `GET /api/team-members/:slug?locale=ka` — published member
- `GET /api/team-members/admin` — all members and translations (admin)
- `POST /api/team-members/admin` — create (admin)
- `PUT /api/team-members/admin/:id` — update (admin)
- `DELETE /api/team-members/admin/:id` — delete (admin)

Portraits uploaded in the admin UI use the existing presigned S3 upload flow
and are served through the configured CloudFront domain. Existing local image
paths beginning with `/img/` continue to work.

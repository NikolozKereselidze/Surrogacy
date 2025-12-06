import Footer from "@/components/Footer";

interface BlogLayoutProps {
  children: React.ReactNode;
}

const BlogLayout = ({ children }: BlogLayoutProps) => {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default BlogLayout;

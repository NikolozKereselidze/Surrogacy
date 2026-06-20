import Footer from "@/components/Footer";
import Navigation from "@/components/Navigation/Navigation";
import ScrollToTop from "@/components/ScrollToTop";
interface BlogLayoutProps {
    children: React.ReactNode;
}
const BlogLayout = ({ children }: BlogLayoutProps) => {
    return (<>
      <ScrollToTop />
      <Navigation />
      <main>{children}</main>
      <Footer />
    </>);
};
export default BlogLayout;

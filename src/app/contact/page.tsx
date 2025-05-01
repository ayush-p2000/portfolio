import ContactForm from "@/app/contact/components/contactpage";
import {ContactHeader} from "@/app/contact/components/contact-header";
import Cursor from "@/components/ui/cursor";

export default function Home() {
    return (
        <>
            <Cursor/>
            <ContactHeader/>
            <ContactForm/>
        </>
    );
}
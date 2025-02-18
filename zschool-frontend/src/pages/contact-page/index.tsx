import ContactCard from "./ContactCard";
import ContactForm from "./ContactForm";

const ContactPage = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 my-12 w-2/3 mx-auto gap-4 min-h-[650px]">
        <ContactForm />
        <ContactCard />
      </div>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.8581690910514!2d106.68427047457543!3d10.822164158349356!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3174deb3ef536f31%3A0x8b7bb8b7c956157b!2sIndustrial%20University%20of%20Ho%20Chi%20Minh%20City!5e0!3m2!1sen!2s!4v1739883054792!5m2!1sen!2s"
        width="100%"
        height="400"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </>
  );
};

export default ContactPage;

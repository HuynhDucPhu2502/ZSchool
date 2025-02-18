import { LucideIcon } from "lucide-react";

type Props = {
  title: string;
  description: string;
  icon: LucideIcon;
};

const ContactItem: React.FC<Props> = ({ title, description, icon: Icon }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="flex flex-row space-x-4">
        <Icon className="text-blue-500 w-6 h-6" />
        <div>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-md max-w-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;

import ContactItem from "./ContactItem";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Building, Headphones, Mail, Phone } from "lucide-react";

const ContactCard = () => {
  return (
    <>
      <Card className="w-full mx-auto py-4 px-8 border-2 border-gray-300 shadow-lg space-y-4 rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg lg:text-2xl">
            Thông tin liên lạc
          </CardTitle>
          <CardDescription className="lg:text-lg">
            Khám phá kênh truyền thông.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-full flex flex-col justify-center space-y-4 ">
            <ContactItem
              title="ZSchool Vietnam Campus"
              description="ZSchool, 12 Nguyễn Văn Bảo, Phường 1, Gò Vấp, Hồ Chí Minh."
              icon={Building}
            />
            <ContactItem
              title="Văn phòng tuyển sinh"
              description="(+84) 28 1234 5678"
              icon={Phone}
            />
            <ContactItem
              title="Hỗ trợ qua Email"
              description="support@zschool.edu.vn"
              icon={Mail}
            />
            <ContactItem
              title="Dịch vụ hỗ trợ sinh viên"
              description="student.help@zschool.edu.vn."
              icon={Headphones}
            />
          </div>
        </CardContent>
      </Card>
    </>
  );
};

export default ContactCard;

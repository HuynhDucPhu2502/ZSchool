import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { Alert, AlertDescription, AlertTitle } from "../../components/ui/alert";

import { sendContact } from "../../api/ContactAPI";
import { useMutation } from "@tanstack/react-query";
import { Contact } from "../../models";
import { AlertCircle, SquareCheck } from "lucide-react";
import { useEffect } from "react";

const ContactForm = () => {
  const { mutate, isPending, isError, isSuccess, error, reset } = useMutation({
    mutationFn: sendContact,
  });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (isSuccess) {
      timeout = setTimeout(() => reset(), 60000);
    }

    return () => {
      if (isSuccess || timeout) clearTimeout(timeout);
    };
  }, [isSuccess, reset]);

  const handleSend = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const contactData: Contact = {
      name: formData.get("name") as string,
      mobileNumber: formData.get("mobileNumber") as string,
      email: formData.get("email") as string,
      message: formData.get("message") as string,
      subject: formData.get("subject") as string,
    };

    mutate(contactData);
  };

  return (
    <>
      <Card className="w-full mx-auto py-4 px-8 border-2 border-gray-300 shadow-lg space-y-4 rounded-lg">
        <CardHeader>
          <CardTitle className="text-lg lg:text-2xl">Đăng ký tư vấn</CardTitle>
          <CardDescription className="lg:text-lg">
            Hãy trò chuyện với chúng tôi.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleSend}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <Input name="name" placeholder="Họ và tên" required />
              <Input
                name="email"
                type="email"
                placeholder="Địa chỉ email"
                required
              />
            </div>

            <Input name="subject" placeholder="Chủ đề cần trao đổi" required />

            <Input
              name="mobileNumber"
              type="tel"
              placeholder="Số điện thoại liên hệ"
              required
            />

            <Textarea
              name="message"
              placeholder="Nội dung tin nhắn"
              className="min-h-[100px]"
              required
            ></Textarea>
            {isPending && <Button disabled>Đang gửi tin nhắn...</Button>}
            {!isPending && <Button>Gửi tin nhắn</Button>}
          </form>
          {isError && (
            <Alert variant="destructive" className="my-2">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Lỗi</AlertTitle>
              <AlertDescription>{error.message}</AlertDescription>
            </Alert>
          )}
          {isSuccess && (
            <Alert className="my-2 w-full" variant="success">
              <SquareCheck className="h-4 w-4" />
              <AlertTitle>Thành Công</AlertTitle>
              <AlertDescription>
                Thông tin bạn đã được nhận, chúng tôi sẽ liên hệ bạn sớm nhất có
                thể.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>
    </>
  );
};

export default ContactForm;

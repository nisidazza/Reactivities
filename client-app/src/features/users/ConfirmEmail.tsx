import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Button, Header, Icon, Segment } from "semantic-ui-react";
import agent from "../../app/api/agent";
import { useStore } from "../../app/stores/store";
import { useQuery } from "../../app/util/hooks";
import { LoginForm } from "./LoginForm";

export const ConfirmEmail = () => {
  const { modalStore } = useStore();
  const email = useQuery().get("email") as string;
  const token = useQuery().get("token") as string;

  const Status = {
    Verifying: "Verifying",
    Failed: "Failed",
    Success: "Success",
  };

  const [status, setStatus] = useState(Status.Verifying);

  const handleConfirmEmailResend = () => {
    agent.AccountRequests.resendEmailConfirm(email)
      .then(() => {
        toast.success("Verfication email resent = please check your email");
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    agent.AccountRequests.verifyEmail(token, email)
      .then(() => {
        setStatus(Status.Success);
      })
      .catch(() => {
        setStatus(Status.Failed);
      });
  }, [Status.Failed, Status.Success, token, email]);

  const getBody = () => {
    switch (status) {
      case Status.Verifying:
        return <p>Verifying...</p>;

      case Status.Failed:
        return (
          <div>
            <p>
              Verification filed.You can try resending the verify link to your
              email
            </p>
            <Button
              primary
              onClick={handleConfirmEmailResend}
              size="huge"
              content="Resend email"
            />
          </div>
        );

      case Status.Success:
        return (
          <div>
            <p>Email has been verified - you can now login</p>
            <Button
              primary
              onClick={() => modalStore.openModal(<LoginForm />)}
              size="huge"
              content="Login"
            />
          </div>
        );
    }
  };

  return (
    <Segment placeholder textAlign="center">
      <Header icon>
        <Icon name="envelope" />
        Email verification
      </Header>
      <Segment.Inline>{getBody()}</Segment.Inline>
    </Segment>
  );
};

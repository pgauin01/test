import { Popover } from "antd";
import { HelpIcon } from "../assets/HelpIcon";

export const ModalTitle = (props) => {
  console.log(props);
  return (
    <>
      {props.icon}
      <p className="title-text">{props.title}</p>
      {/* {props.help_text && (
        <Popover
          overlayClassName="modal-popover"
          content={props.help_text}
          placement="top"
          title={props.title?.split("-")[1]?.trim()}
        >
          <HelpIcon />
        </Popover>
      )} */}
    </>
  );
};

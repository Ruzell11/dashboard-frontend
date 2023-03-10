import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconType } from "react-icons";
import Link from "next/link";

import jsCookie from "js-cookie";
import { useRouter } from "next/router";

interface ArrayProps {
  name: string;
  link: string;
}

interface DropDownProps {
  DropdownMenuArray: ArrayProps[];
  icon: IconType;
  iconStyle: string;
  isLogin: string | undefined;
}

const DropdownMenu: React.FC<DropDownProps> = ({
  icon: Icon,
  iconStyle,
  isLogin,
}: DropDownProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const router = useRouter();
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    jsCookie.remove("access-token");
    jsCookie.remove("id");
    router.replace("/login");
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <span className={iconStyle}>
          <Icon />
        </span>
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {isLogin ? (
          [
            <Link href="" key="profile">
              <MenuItem onClick={handleClose}>Profile</MenuItem>
            </Link>,
            <Link href="" key="logout" onClick={handleLogout}>
              <MenuItem>Logout</MenuItem>
            </Link>,
          ]
        ) : (
          <Link href="/login" key="login">
            <MenuItem onClick={handleClose}>Login</MenuItem>
          </Link>
        )}
      </Menu>
    </div>
  );
};

export default DropdownMenu;

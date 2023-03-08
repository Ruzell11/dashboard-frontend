import * as React from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IconType } from "react-icons";
import Link from "next/link";

interface ArrayProps {
  name: string;
  link: string;
}

interface DropDownProps {
  DropdownMenuArray: ArrayProps[];
  icon: IconType;
  iconStyle: string;
}

const DropdownMenu: React.FC<DropDownProps> = ({
  DropdownMenuArray,
  icon: Icon,
  iconStyle,
}: DropDownProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
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
        {DropdownMenuArray.map((item: any, index: number) => {
          const loginLink = index == 1;
          return (
            <>
              {/* This is temporary I will refactor it and will base if the user is logged in */}
              {loginLink ? (
                <Link href={`/${item.link}`}>
                  <MenuItem onClick={handleClose}>{item.name}</MenuItem>
                </Link>
              ) : (
                <Link href={`/dashboard/${item.link}`}>
                  <MenuItem onClick={handleClose}>{item.name}</MenuItem>
                </Link>
              )}
            </>
          );
        })}
      </Menu>
    </div>
  );
};

export default DropdownMenu;

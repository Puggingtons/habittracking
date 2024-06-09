import { IconButton, Menu, MenuItem } from "@mui/material";

import Api from "../api/Api";
import { MoreVert } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { useState } from "react";

export default function MenuButton() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [open, setOpen] = useState<boolean>(false);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setOpen(true);
  };

  const onClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  const logout = () => {
    Api.logout();
    navigate("/login");
  };

  return (
    <>
      <IconButton onClick={onClick}>
        <MoreVert />
      </IconButton>
      <Menu onClose={onClose} open={open} anchorEl={anchorEl}>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
}

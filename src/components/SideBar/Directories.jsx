import TrashIcon from "../../assets/icons/trash.svg?react";
import EditIcon from "../../assets/icons/edit.svg?react";
import ArrowIcon from "../../assets/icons/arrow.svg?react";
import {
  Button,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  SvgIcon,
} from "@mui/material";
import { Box } from "@mui/system";
import { useState } from "react";
import EditDialog from "./EditDialog";
import CreateDialog from "./CreateDialog";
import DeleteDialog from "./DeleteDialog";
import { NavLink, useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import {
  createDirectoryThunk,
  deleteDirectoryThunk,
  updateDirectoryThunk,
} from "../../features/directories/directoryThunks";
import {
  selectAllDirectories,
  selectDefaultDirectory,
} from "../../features/directories/directorySelectors";
// =================================================================================

function Directories() {
  const dispatch = useDispatch();
  const directoris = useSelector(selectAllDirectories);
  const defaultDIrectory = useSelector(selectDefaultDirectory);
  const navigation = useNavigate();
  const location = useLocation();

  const [directoriesOpen, setDirectoriesOpen] = useState(false);
  const [showIcons, setShowIcons] = useState("none");
  const [editInputValue, setEditInputValue] = useState("");
  const [createInputValue, setCreateInputValue] = useState("");
  const [directoryId, setDirectoryId] = useState(null);

  const toggleDirectories = () => setDirectoriesOpen(!directoriesOpen);

  const handleEdite = (e) => {
    setDirectoryId(e.currentTarget.parentElement.parentElement.ariaLabel);
    setOpenEditDialog(true);
  };
  const handleDelete = (e) => {
    setDirectoryId(e.currentTarget.parentElement.parentElement.ariaLabel);
    setOpenDeleteDialog(true);
  };
  const handleCreate = () => setOpenCreateDialog(true);

  const [openEditDialog, setOpenEditDialog] = useState(false);
  const handleCloseEditDialog = () => setOpenEditDialog(false);

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const handleCloseCreateDialog = () => setOpenCreateDialog(false);

  const handleCreateDirectory = () => {
    dispatch(createDirectoryThunk({ name: createInputValue }));
    setCreateInputValue("");
    handleCloseCreateDialog();
  };
  const handleEditDirectory = (e) => {
    dispatch(
      updateDirectoryThunk({ id: directoryId, data: { name: editInputValue } }),
    );
    setDirectoryId(null);
    setEditInputValue("");
    handleCloseEditDialog();
  };
  const handleDeleteDirectory = () => {
    dispatch(deleteDirectoryThunk(directoryId));
    setDirectoryId(null);
    location.pathname === `/directory/${directoryId}` && navigation("/");
    handleCloseDeleteDialog();
  };

  const otherDirectories = directoris.filter((d) => !d.isDefaultDirectory);

  return (
    <>
      {/* Dropdown */}
      <ListItemButton onClick={toggleDirectories}>
        {directoriesOpen ? (
          <SvgIcon
            component={ArrowIcon}
            inheritViewBox
            sx={{ fontSize: "1rem" }}
            style={{ transform: "rotate(180deg)" }}
          />
        ) : (
          <SvgIcon
            component={ArrowIcon}
            inheritViewBox
            sx={{ fontSize: "1rem" }}
            style={{ transform: "rotate(90deg)" }}
          />
        )}
        <ListItemText primary="Directories" sx={{ marginLeft: "4px" }} />
      </ListItemButton>

      {/* Dropdown Contents */}
      <Collapse in={directoriesOpen} timeout="auto" unmountOnExit>
        <List component="div" sx={{ "& .MuiTypography-root": { pl: 4 } }}>
          {/* Main Directory */}
          {defaultDIrectory && (
            <ListItemButton
              aria-label={defaultDIrectory._id}
              component={NavLink}
              to={`/directory/${defaultDIrectory._id}`}
              sx={{
                "&.active": {
                  color: "error.dark",
                  bgcolor: "error.light",
                  borderRight: "4px solid",
                  borderColor: "error.dark",
                },
              }}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <ListItemText primary={defaultDIrectory.name} />
            </ListItemButton>
          )}

          {/* New Directories */}
          {otherDirectories.map((d) => (
            <ListItemButton
              key={d._id}
              aria-label={d._id}
              component={NavLink}
              to={`/directory/${d._id}`}
              onMouseEnter={() => setShowIcons("block")}
              onMouseLeave={() => setShowIcons("none")}
              sx={{
                "&.active": {
                  color: "error.dark",
                  bgcolor: "error.light",
                  borderRight: "4px solid",
                  borderColor: "error.dark",
                },
              }}
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              <ListItemText primary={d.name} />

              {/* edit & delete directory btns */}
              <Box sx={{ display: showIcons }}>
                <SvgIcon
                  component={EditIcon}
                  sx={{
                    fontSize: "1rem",
                    color: "text.secondary",
                    fill: "none",
                    "&:hover": { color: "primary.main" },
                    mr: 1,
                  }}
                  onClick={handleEdite}
                />
                <SvgIcon
                  component={TrashIcon}
                  sx={{
                    fontSize: "1rem",
                    color: "text.secondary",
                    "&:hover": { color: "primary.main" },
                  }}
                  onClick={handleDelete}
                />
              </Box>
            </ListItemButton>
          ))}
          {/* Create new directory btn */}
          <ListItemButton
            component={Button}
            onClick={handleCreate}
            sx={{
              fontSize: "0.75rem",
              border: "2px dashed",
              borderColor: "text.secondary",
              borderRadius: "4px",
              pl: 1,
              py: 0.5,
              ml: 5,
              mt: 1,
            }}
          >
            +New
          </ListItemButton>
        </List>
      </Collapse>

      {/* Modals */}
      <EditDialog
        openEditDialog={openEditDialog}
        handleCloseEditDialog={handleCloseEditDialog}
        handleEditDirectory={handleEditDirectory}
        inputValue={editInputValue}
        setInputValue={setEditInputValue}
      />
      <CreateDialog
        openCreateDialog={openCreateDialog}
        handleCloseCreateDialog={handleCloseCreateDialog}
        inputValue={createInputValue}
        setInputValue={setCreateInputValue}
        handleCreateDirectory={handleCreateDirectory}
      />
      <DeleteDialog
        openDeleteDialog={openDeleteDialog}
        handleCloseDeleteDialog={handleCloseDeleteDialog}
        handleDeleteDirectory={handleDeleteDirectory}
      />
    </>
  );
}

export default Directories;

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  IconButton,
  Chip,
  InputAdornment,
  Button,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";

// Mock users - replace with your actual API
const MOCK_USERS = [
  { id: 1, name: "Sarah Johnson", username: "@sarahj", avatar: null },
  { id: 2, name: "Michael Chen", username: "@mikechen", avatar: null },
  { id: 3, name: "Emily Davis", username: "@emilyd", avatar: null },
  { id: 4, name: "James Wilson", username: "@jameswilson", avatar: null },
  { id: 5, name: "Jessica Lee", username: "@jesslee", avatar: null },
];

const TagPeopleDialog = ({ open, onClose, onTagsConfirm }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);

  const filteredUsers = MOCK_USERS.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  ).filter((user) => !selectedUsers.find((u) => u.id === user.id));

  const handleToggleUser = (user) => {
    setSelectedUsers([...selectedUsers, user]);
    setSearchQuery("");
  };

  const handleRemoveUser = (userId) => {
    setSelectedUsers(selectedUsers.filter((u) => u.id !== userId));
  };

  const handleConfirm = () => {
    onTagsConfirm(selectedUsers);
    setSelectedUsers([]);
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
          maxHeight: "80vh",
        },
      }}
    >
      <DialogTitle sx={{ display: "flex", alignItems: "center", gap: 1, pb: 1 }}>
        <PersonIcon sx={{ color: "#6A0DAD" }} />
        <span className="flex-1 font-bold font-urbanist">Tag People</span>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent sx={{ pt: 2 }}>
        {/* Selected Users */}
        {selectedUsers.length > 0 && (
          <div className="mb-4 flex flex-wrap gap-2">
            {selectedUsers.map((user) => (
              <Chip
                key={user.id}
                label={user.name}
                onDelete={() => handleRemoveUser(user.id)}
                avatar={
                  <Avatar sx={{ bgcolor: "#6A0DAD" }}>
                    {user.name.charAt(0)}
                  </Avatar>
                }
                sx={{
                  backgroundColor: "#f3e8ff",
                  "& .MuiChip-deleteIcon": {
                    color: "#6A0DAD",
                  },
                }}
              />
            ))}
          </div>
        )}

        {/* Search Bar */}
        <TextField
          fullWidth
          placeholder="Search people to tag"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          size="small"
          sx={{ mb: 2 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* User List */}
        {searchQuery && (
          <List sx={{ maxHeight: "300px", overflow: "auto" }}>
            {filteredUsers.map((user) => (
              <ListItem key={user.id} disablePadding>
                <ListItemButton
                  onClick={() => handleToggleUser(user)}
                  sx={{
                    borderRadius: 2,
                    mb: 1,
                    "&:hover": {
                      backgroundColor: "#f3e8ff",
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: "#6A0DAD" }}>
                      {user.name.charAt(0)}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={user.name}
                    secondary={user.username}
                    primaryTypographyProps={{
                      fontWeight: 600,
                      fontSize: "0.95rem",
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}

            {filteredUsers.length === 0 && (
              <div className="text-center py-4 text-gray-400">
                <p>No users found</p>
              </div>
            )}
          </List>
        )}

        {/* Confirm Button */}
        <Button
          fullWidth
          variant="contained"
          onClick={handleConfirm}
          disabled={selectedUsers.length === 0}
          sx={{
            mt: 3,
            backgroundColor: "#6A0DAD",
            "&:hover": {
              backgroundColor: "#5a0b92",
            },
            textTransform: "none",
            fontWeight: 600,
            py: 1.5,
          }}
        >
          Tag {selectedUsers.length} {selectedUsers.length === 1 ? "Person" : "People"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default TagPeopleDialog;
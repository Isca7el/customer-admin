import { SubmitHandler, useForm } from "react-hook-form";
import { Box, Button, Container, Grid, MenuItem, Stack, TextField } from "@mui/material";
import Typography from "@mui/material/Typography";
import React from "react";
import { AdminUserInfo } from "../../../../typescript-types/db.types";
import { ErrorMessage } from "@hookform/error-message";
import { VALIDATORS } from "../../utils/formValidator";
import { DepartmentFields } from "./UsersPage";
import { UserInfoWithId } from "./AllUsers";

interface UserFormProps {
  postUserInfo: (props: AdminUserInfo) => Promise<void>;
  departments: DepartmentFields[];
  defaultValues?: UserInfoWithId;
}

export function UserForm({ postUserInfo, departments, defaultValues }: UserFormProps) {
  const roles = ["user", "admin"];
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<AdminUserInfo>({ defaultValues });
  const onSubmit: SubmitHandler<AdminUserInfo> = async (data) => {
    const userInfo: AdminUserInfo = {
      lastName: data.lastName || "",
      firstName: data.firstName || "",
      email: data.email,
      job: data.job || "",
      departmentID: data.departmentID || "",
      grade: data.grade || "",
      location: data.location || "",
      project: data.project || "",
      role: data.role || "",
      isActive: data.isActive || false,
    };
    postUserInfo(userInfo);
  };

  return (
    <Container sx={{ display: "flex", justifyContent: "center" }}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2} width={508} padding={10} sx={{ paddingTop: "48px" }}>
          <Box sx={{ paddingBottom: "24px" }}>
            <Typography variant="h2" component="h2">
              Company Info
            </Typography>
          </Box>
          <Grid container spacing={0}>
            <Grid item xs={4}>
              img
            </Grid>
            <Grid item xs={8}>
              <Stack spacing={"24px"} width={316} paddingLeft={"22.66px"}>
                <TextField
                  label={"First Name"}
                  error={!!errors.firstName}
                  placeholder={"Example"}
                  {...register("firstName")}
                />
                <TextField
                  label={"lastName"}
                  {...register("lastName")}
                  placeholder={"lastName"}
                  error={!!errors.lastName}
                  helperText={<ErrorMessage errors={errors} name="name" />}
                />
              </Stack>
            </Grid>
          </Grid>
          <TextField
            label={"Email"}
            {...register("email", VALIDATORS.EMAIL)}
            error={!!errors.email}
            helperText={<ErrorMessage errors={errors} name="email" />}
            placeholder={"Enter company email"}
          />
          <TextField
            label={"location"}
            {...register("location", { required: false })}
            placeholder={"location"}
          />
          <Box sx={{ paddingBottom: "24px", paddingTop: "24px" }}>
            <Typography variant="h2" component="h2">
              Corporate information
            </Typography>
          </Box>
          <TextField
            select
            defaultValue={defaultValues?.role || "user"}
            label="role"
            {...register("role", { required: true })}
          >
            {roles.map((role) => (
              <MenuItem value={role}>{role}</MenuItem>
            ))}
          </TextField>
          <TextField label={"job"} {...register("job", { required: false })} placeholder={"job"} />
          <TextField
            label={"grade"}
            {...register("grade", { required: false })}
            placeholder={"grade"}
          />
          <TextField
            select
            label="department"
            defaultValue={defaultValues?.departmentID || ""}
            {...register("departmentID", { required: false })}
          >
            {departments.map((department) => {
              return <MenuItem value={department.id}>{department.name}</MenuItem>;
            })}
          </TextField>

          <TextField
            label={"Project"}
            {...register("project", { required: false })}
            placeholder={"project"}
          />

          <Stack paddingTop={"40px"} spacing={2} direction={"row"}>
            <Button variant={"contained"} type="submit">
              Save Changes
            </Button>
          </Stack>
        </Stack>
      </form>
    </Container>
  );
}

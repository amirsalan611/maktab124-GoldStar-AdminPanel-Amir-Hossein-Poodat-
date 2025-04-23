// 𝒓𝒐𝒔𝒕𝒂𝒎𝒊, [4/22/2025 9:13 PM]
// import {
//   useGetAllCategoryToDashboard,
//   useGetSubcategories,
//   usePostDataProducts,
// } from "@/components/dashboard/hooks";
// import { ProductsType } from "@/components/home/hooks/type";
// import { ICategoryTypes, IProduct, ISubCategoryTypes } from "@/types/types";
// import {
//   Box,
//   FormControl,
//   Grid,
//   MenuItem,
//   Select,
//   TextField,
//   Typography,
// } from "@mui/material";
// import Button from "@mui/material/Button";
// import dynamic from "next/dynamic";
// import { useEffect, useState } from "react";
// import { useForm } from "react-hook-form";
// import { useTranslation } from "react-i18next";
// import "react-quill/dist/quill.snow.css";
// import { toast } from "react-toastify";
// const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

// function TextFieldsAddProducts({ setOpen }: any) {
//   const { data: categories } = useGetAllCategoryToDashboard();
//   const [selectedCategory, setSelectedCategory] = useState<string>(
//     "668e9e5417db3dbf85b617c9"
//   );
//   const [selectedSubCategory, setSelectedSubCategory] = useState<string>("");

//   const { data: subcategories } = useGetSubcategories(selectedCategory);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<IProduct>();

//   const { t } = useTranslation();

//   useEffect(() => {
//     if (selectedCategory && subcategories) {
//       setSelectedSubCategory(subcategories[0]?._id || "");
//       setValue("subcategory", subcategories[0]?._id || "");
//     }
//   }, [selectedCategory, subcategories, setValue]);

//   const mutation = usePostDataProducts();

//   const onSubmit = (data: ProductsType) => {
//     let formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("quantity", data.quantity as unknown as string);
//     formData.append("price", data.price as unknown as string);
//     formData.append("brand", data.brand);
//     formData.append("category", selectedCategory);
//     formData.append("subcategory", selectedSubCategory);
//     formData.append("description", data.description);
//     if (data.images && data.images.length > 0) {
//         data.images.map((i)=>{formData.append("images", i.images[0]);})
//     }
//     mutation.mutate(formData, {
//       onSuccess: () => {
//         setOpen(false);
//         toast.success(t("dashboard.modal.add_success"));
//       },
//       onError: () => {
//         toast.error(t("dashboard.modal.add_error"));
//       },
//     });
//   };

//   return (
//     <form onSubmit={handleSubmit(onSubmit)}>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
//           <FormControl fullWidth variant="outlined">
//             <Select
//               {...register("category", {
//                 required: t("dashboard.modal.error.category"),
//               })}
//               error={!!errors.category}
//               value={selectedCategory}
//               onChange={(e) => setSelectedCategory(e.target.value)}
//             >
//               {categories &&
//                 categories.map((category: ICategoryTypes) => (
//                   <MenuItem key={category._id} value={category._id}>
//                     {category.name}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <FormControl
//             fullWidth
//             variant="outlined"
//             disabled={selectedCategory === ""}
//           >
//             <Select
//               {...register("subcategory", {
//                 required: t("dashboard.modal.error.subcategory"),
//               })}
//               error={!!errors.subcategory}
//               value={selectedSubCategory}
//               onChange={(e) => setSelectedSubCategory(e.target.value)}
//             >
//               {subcategories &&
//                 subcategories.map((subcategory: ISubCategoryTypes) => (
//                   <MenuItem key={subcategory._id} value={subcategory._id}>

// 𝒓𝒐𝒔𝒕𝒂𝒎𝒊, [4/22/2025 9:13 PM]
// {subcategory.name}
//                   </MenuItem>
//                 ))}
//             </Select>
//           </FormControl>
//         </Grid>
//         <Grid item xs={12}>
//           <TextField
//             fullWidth
//             label={t("dashboard.modal.name")}
//             variant="outlined"
//             {...register("name", { required: t("dashboard.modal.error.name") })}
//             error={!!errors.name}
//             helperText={errors.name?.message}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label={t("dashboard.modal.brand")}
//             variant="outlined"
//             {...register("brand", {
//               required: t("dashboard.modal.error.brand"),
//             })}
//             error={!!errors.brand}
//             helperText={errors.brand?.message}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label={t("dashboard.modal.price")}
//             variant="outlined"
//             {...register("price", {
//               required: t("dashboard.modal.error.price"),
//             })}
//             error={!!errors.price}
//             helperText={errors.price?.message}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             label={t("dashboard.modal.quantity")}
//             variant="outlined"
//             {...register("quantity", {
//               required: t("dashboard.modal.error.quantity"),
//             })}
//             error={!!errors.quantity}
//             helperText={errors.quantity?.message}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             type="file"
//             inputProps={{
//               ...register("images", {
//                 required: t("dashboard.modal.error.images"),
//               }),
//             }}
//             error={!!errors.images}
//             helperText={errors.images?.message}
//           />
//         </Grid>
//         <Grid item xs={12}>
//           <Box sx={{ mb: 10 }}>
//             <ReactQuill
//               theme="snow"
//               onChange={(value) => setValue("description", value)}
//               style={{ height: "150px" }}
//             />
//             {errors.description && (
//               <Typography style={{ color: "red" }}>
//                 {errors.description.message}
//               </Typography>
//             )}
//           </Box>
//         </Grid>
//         <Grid item xs={12} sx={{ display: "flex", justifyContent: "center" }}>
//           <Button variant="contained" color="primary" type="submit" fullWidth>
//             {t("dashboard.modal.add")}
//           </Button>
//         </Grid>
//       </Grid>
//     </form>
//   );
// }

// export default TextFieldsAddProducts;

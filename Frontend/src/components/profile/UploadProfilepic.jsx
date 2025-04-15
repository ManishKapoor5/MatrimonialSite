const uploadProfilePic = async (file, token) => {
  const formData = new FormData();
  formData.append("profilePic", file);

  const res = await fetch("http://localhost:5000/upload-profile-pic", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const data = await res.json();
  console.log("Uploaded Image URL:", data.url);
};

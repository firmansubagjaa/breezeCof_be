const express = require("express");
const app = express();
const port = 3000;

//endpoint
//get
app.get("/products", (req, res) => {
  return res.status(201).json([
    {
      createdAt: "2022-12-30T08:34:29.651Z",
      name: "Gregg Corwin",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/779.jpg",
      id: "1",
    },
    {
      createdAt: "2022-12-30T07:22:28.240Z",
      name: "Curtis Littel",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/544.jpg",
      id: "2",
    },
    {
      createdAt: "2022-12-29T13:59:32.217Z",
      name: "Eleanor Roberts",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/143.jpg",
      id: "3",
    },
    {
      createdAt: "2022-12-29T15:23:21.067Z",
      name: "Craig Jacobs Jr.",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/950.jpg",
      id: "4",
    },
    {
      createdAt: "2022-12-30T09:43:45.646Z",
      name: "Terry Mayert",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1072.jpg",
      id: "5",
    },
    {
      createdAt: "2022-12-30T13:31:46.777Z",
      name: "Gregg Hessel",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/1187.jpg",
      id: "6",
    },
    {
      createdAt: "2022-12-29T21:52:23.967Z",
      name: "Wm Denesik",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/217.jpg",
      id: "7",
    },
    {
      createdAt: "2022-12-30T09:23:48.661Z",
      name: "Bobby Cummings",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/123.jpg",
      id: "8",
    },
  ]);
});

app.get("/products/:id", (req, res) => {
  return res.status(201).json([
    {
      createdAt: "2022-12-30T08:34:29.651Z",
      name: "Gregg Corwin",
      avatar: "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/779.jpg",
      id: req.params.id,
    },
  ]);
});

app.post("/products", (req, res) => {
  return res.status(201).send({ message: "success" });
});
app.put("/products", (req, res) => {
  return res.status(201).send({ message: "success" });
});
app.patch("/products", (req, res) => {
  return res.status(201).send({ message: "success" });
});
app.delete("/products", (req, res) => {
  return res.status(201).send({ message: "success" });
});

app.get("*", (req, res) => {
  return res.send({
    status: 404,
    message: "Not Found",
  });
});

//pemanggil
app.listen(port, () => {
  console.log("latihan express.js");
});

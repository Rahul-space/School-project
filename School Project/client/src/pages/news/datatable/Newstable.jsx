import "./newstable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../../datatablesource";
import { Link } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const Datatable = () => {
  const [data, setData] = useState([]);
  const [trigger,setTrigger]=useState(true)
  const [news,setNews]=useState([])
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        const n=axios.delete("http://localhost:8800/website/news/delete/"+id).then((res)=>{
        setTrigger(true)
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });});
      }
    });
    
    setTrigger(true)
  };
  const fetchNews=async()=>{
    try{
      const n=await axios.get("http://localhost:8800/website/news");
      setNews(n.data)
    }catch(err){
      console.log(err)
    }
  };


  const handlemethod = async (id,method) => {
    try{
      if(method){
      const published=await axios.post("http://localhost:8800/website/news/"+id+"/draft")
      }else{
      const published=await axios.post("http://localhost:8800/website/news/"+id+"/publish")}
      setTrigger(true)
    }catch(err){
      console.log(err)
    }
  }



  useEffect(async()=>{
    await fetchNews()
    setData(news)
    setTrigger(false)
    console.log(news)
  },[trigger]);


  const userColumns = [
    { field: "_id", headerName: "ID", width: 100 },
    {
      field: "title",
      headerName: "Title",
      width: 220,
      renderCell: (params) => {
        return (
          <div className="cellWithImg">
            <img className="cellImg" src={params.row.photo} alt="avatar" />
            {params.row.title}
          </div>
        );
      },
    },
    {
      field: "description",
      headerName: "breif",
      width: 200,
    },
    {
      field: "schools",
      headerName: "schools",
      width: 100,
    },
  
    {
      field: "publish",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <div className={`cellWithStatus ${params.row.publish}`}>
            {params.row.publish? "active":"Pending" }
          </div>
        );
      },
    },
    {
      field: "updatedAt",
      headerName: "Updated at",
      width: 140,
    },
  ];

  
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
             <div
              className={`publishButton ${params.row.publish}`}
              onClick={() => handlemethod(params.row._id,params.row.publish)}
            >
              {params.row.publish? "draft":"Publish" }
            </div>
            <Link to={"/news/"+params.row._id}  style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={() => handleDelete(params.row._id)}
            >
              Delete
            </div>
           
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle" onClick={()=>setTrigger(true)}>
        Add New User
        <Link to="/news/new" className="link">
          Add New
        </Link>
      </div>
      <DataGrid
        getRowId={(row) => row._id}
        className="datagrid"
        rows={data}
        columns={userColumns.concat(actionColumn)}
        pageSize={9}
        rowsPerPageOptions={[9]}
        checkboxSelection
      />
    </div>
  );
};

export default Datatable;

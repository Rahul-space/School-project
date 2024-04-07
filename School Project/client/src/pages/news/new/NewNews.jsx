import "./newNews.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useState } from "react";
import React, { useRef } from 'react';
import axios from "axios";
import { Editor } from '@tinymce/tinymce-react';
import swal from "sweetalert2";
const New = ({titlew }) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedSchool, setSelectedSchool] = useState('school1');

  const editorRef = useRef(null);
  const handleCreate = async () => {
    setLoading(true);
    const body={"title":title,"description":description,"photo":file,"schools":selectedSchool}
    try{
      const res=await axios.post("http://localhost:8800/website/news/create",body)
      console.log(res)
      swal.fire({
        title: "Success",
        text: "News Created Successfully",
        icon: "success",
      });
    }catch(err){
      swal.fire({
        title: "Error",
        text: err.message,
        icon: "error",
      });
    }
    setLoading(false);
  }
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSchoolChange = (e) => {
    
    setSelectedSchool(e.target.value);
  };

  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>{titlew}</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                file
                  ? URL.createObjectURL(file)
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
          <form>
      <div className="formInput">
        <label htmlFor="file">
          Image: <DriveFolderUploadOutlinedIcon className="icon" />
        </label>
        <input
          type="file"
          id="file"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </div>
      <div className="formInput">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title..."
        />
      </div>
      <div className="formInput">
        <label htmlFor="schools">Schools</label>
        <select
          id="schools"
          value={selectedSchool}
          onChange={(e)=>handleSchoolChange(e)}
        >
          <option value="School1">School 1</option>
          <option value="School2">School 2</option>
          <option value="School3">School 3</option>
          <option value="School4">School 4</option>
        </select>
      </div>
      <div key="4" type="button" className="button" onClick={handleCreate} disabled={loading}>{loading?"Crating":"Create"}</div>
    </form>
          </div>
        </div>
        <div className="bottom">
        <Editor onChange={(e)=>setDescription(e.target.getContent())}
      apiKey='q926hm4xzdo54ljqozk5fr12js9i7mrcufn5y6ktbcoj65nt'
      init={{
        plugins: 'anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount checklist mediaembed casechange export formatpainter pageembed linkchecker a11ychecker tinymcespellchecker permanentpen powerpaste advtable advcode editimage advtemplate ai mentions tinycomments tableofcontents footnotes mergetags autocorrect typography inlinecss markdown',
        toolbar: 'undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table mergetags | addcomment showcomments | spellcheckdialog a11ycheck typography | align lineheight | checklist numlist bullist indent outdent | emoticons charmap | removeformat',
        tinycomments_mode: 'embedded',
        tinycomments_author: 'Author name',
        mergetags_list: [
          { value: 'First.Name', title: 'First Name' },
          { value: 'Email', title: 'Email' },
        ],
        ai_request: (request, respondWith) => respondWith.string(() => Promise.reject("See docs to implement AI Assistant")),
      }}
    />

        </div>
      </div>
      
    </div>
  );
};

export default New;

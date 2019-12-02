import React, { Component } from 'react';
import { generateOlContent, generateUlContent, parseOlContent, parseUlContent } from '../util/Parsing'
import db from '../util/firebase'
import axios from 'axios'
import ImageZoom from 'react-medium-image-zoom'
import { imgurToken, } from '../auth/auth.js';

const postImgurOptions = {
  method: 'post',
  url: 'https://api.imgur.com/3/image/',
  headers: {'Authorization': `Bearer ${imgurToken}`, 'Content-Type': 'multipart/form-data'}
};


// Defenition of section type
/*

    1. Atomic 
       - text: <p/>
       - image: <img/>
       - header <h3/>

    2. Composit
        - paragraph:
        {
            header?: <h3/>
            text: <p/>
        }
            paragraph is space automatically at the start of the text.
        - list:
            1. order list <ol></ol>
            2. unorder list <ul></ul>
            Lists can have other types of sections as children.




*/

// Section is used for display in non-edit mode.

export const Section = ({ section }) => {
    switch (section.type) {
        case "paragraph":
            return (
                <div>
                    {
                        section.header === "" ? (null) :
                            (<h2 style={{marginTop: "30px", marginBottom: "20px"}}>{section.header}</h2>)

                    }
                    {
                        section.content === "" ? (null) :
                            (<p>
                                &emsp;&emsp;
                                {section.content}
                            </p>)
                    }
                </div>);
        case "header":
            return (
                <h3 style={{ marginTop: "20px", marginBottom: "10px" }}>
                    {section.header}
                </h3>);
        case "text":
            return (
                <p>
                    {section.content}
                </p>);
        case "image":
            return (
                <div className="text-center">
                    <ImageZoom image={{ src: section.url, className:'col-lg-8', alt: 'pic',  style: { width: '100%' , marginTop: "20px", marginBottom: "50px"} }} />
                </div>);
        case "ul":
            return (
                <ul>
                    {
                        section.list.map((element) => (
                            <li>
                                {element}
                            </li>
                        ))
                    }
                </ul>);
        case "ol":
            return (
                <ol>
                    {
                        section.list.map((element) => (
                            <li>
                                {element}
                            </li>
                        ))
                    }
                </ol>);
        default:


    }
}


const EditTool = (props) => {
    return (
        <div style={{ width: "100%" }}>
            <hr className="editor-divider" />
            <i className="fas fa-plus-circle" />
            <button className="btn btn-outline-secondary" onClick={props.onAddSection("paragraph")}>段落</button>
            <button className="btn btn-outline-secondary" onClick={props.onAddSection("image")}>圖片</button>
            <button className="btn btn-outline-secondary" onClick={props.onAddSection("header")}>次標題</button>
            <button className="btn btn-outline-secondary" onClick={props.onAddSection("text")}>文字</button>
            <button className="btn btn-outline-secondary" onClick={props.onAddSection("ul")}>無順序清單</button>
            <button className="btn btn-outline-secondary" onClick={props.onAddSection("ol")}>順序清單</button>
        </div>);
}

const EditHeader = (props) => {
    return (
        <div className="editor-section">
            <div className=" row">
                <button className="button-normal col" onClick={props.onDeleteSection(props.sectionIndex)}>刪除此段落<i className="far fa-trash-alt"></i><p></p></button>
            </div>
            <div className="row">
                <textarea
                    className="form-control "
                    value={props.header}
                    onChange={props.onContentChange({ index: props.sectionIndex })}
                    rows="1"
                    placeholder="標題..."
                />
            </div>
        </div>

    )
}

const EditText = (props) => {
    return (
        <div className="editor-section">
            <div className=" row">
                <button className="button-normal col"  onClick={props.onDeleteSection(props.sectionIndex)}>刪除此段落<i className="far fa-trash-alt"></i><p></p></button>
            </div>
            <div className="row">
                <textarea
                    className="form-control "
                    value={props.content}
                    onChange={props.onContentChange({ index: props.sectionIndex })}
                    rows="10"
                    placeholder="文字..."
                />
            </div>
        </div>
    )
}

const EditeImage = (props) => {
    return (
        <div className="editor-section">
            <div className=" row">
                <button className="button-normal col"  onClick={props.onDeleteSection(props.sectionIndex)}>刪除此段落<i className="far fa-trash-alt"></i><p></p></button>
            </div>
            <div className="input-group row">

                <div className="custom-file">
                    <input
                        type="file"
                        className="custom-file-input"
                        onChange={props.captureFile(props.sectionIndex)}
                        required
                    />
                    <label className="custom-file-label" for="inputGroupFile02">選擇相片</label>

                </div>
            </div>
            <div className="row" >
                {
                    props.url === null ? (null) : (
                        <ImageZoom image={{ src: props.url, className:'col-lg-6', alt: 'pic',  style: { width: '100%' , marginTop: "20px", marginBottom: "20px"} }} />
                    )
                }
            </div>
        </div>

    );
}

const EditParagraph = (props) => {
    return (
        <div className="editor-section">
            <div className="row">
                <button className="button-normal  col"  onClick={props.onDeleteSection(props.sectionIndex)}>刪除此段落<i className="far fa-trash-alt"></i><p></p></button>
            </div>
            <div className="row">
                <textarea
                    type="text"
                    placeholder="段落標題... (可不填)"
                    value={props.header}
                    onChange={props.onContentChange({ index: props.sectionIndex, isHeader: true })}
                    rows="1"
                    className="form-control "
                />
            </div>
            <div className="row">

                <textarea
                    placeholder="段落內文... (可不填)"
                    className="form-control "
                    value={props.content}
                    rows="20"
                    onChange={props.onContentChange({ index: props.sectionIndex, isHeader: false })}

                />
            </div>
        </div>
    );
}


const EditOl = (props) => {
    return (
        <div className="editor-section">
            <div className="row">
                <button className="button-normal  col"  onClick={props.onDeleteSection(props.sectionIndex)}>刪除此段落<i className="far fa-trash-alt"></i><p></p></button>
            </div>
            <div className="row">
                <textarea
                    className="form-control "
                    placeholder="數字清單..."
                    onChange={props.onContentChange({ index: props.sectionIndex })}
                    value={props.content}
                    rows="8"
                />
            </div>
        </div>
    )
}

const EditUl = (props) => {
    return (
        <div className="editor-section">
            <div className="row">
                <button className="button-normal  col"  onClick={props.onDeleteSection(props.sectionIndex)}>刪除此段落<i className="far fa-trash-alt"></i><p></p></button>
            </div>
            <div className="row">
                <textarea
                    className="form-control "
                    placeholder="無順序清單..."
                    onChange={props.onContentChange({ index: props.sectionIndex })}
                    value={props.content}
                    rows="8"
                />
            </div>
        </div>


    );
}



class Editor extends Component {
    constructor(props) {
        super(props);
        // Sections are passed from the parent component.
        let passedSections = [...this.props.sections];
        passedSections.forEach((section, index) => {
            if (section.type === "ul") {
                passedSections[index] = { type: "ul", content: generateUlContent(section.list) };

            }
            if (section.type === "ol") {
                passedSections[index] = { type: "ol", content: generateOlContent(section.list) };
            }
        });
        this.state = {
            sections: passedSections,
        };
        this.captureFile = this.captureFile.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
        this.onSaveAndExit = this.onSaveAndExit.bind(this);

    }


    onSaveAndExit =  async() =>{
        console.log("save and exit");
        const  uploadToImgur = (fileToImgur)=>{
            const form = new FormData();
            form.append("image", fileToImgur)
            return axios({...postImgurOptions, data: form});
    
        }
    
        let updatedSections = [...this.state.sections];
        // Parse ul and ol element's content into arrays.
        let imgurPostReq = [];
        // Keep the index of the section containing that pic.
        let imgurReqIndex = [];
        const profilePic = this.props.profilePic;
        console.log("profilePic", profilePic);
        updatedSections.forEach((section, index) => {

            if (section.type === "ul") {
                updatedSections[index] = { type: "ul", list: parseUlContent(section.content) };

            }
            else if (section.type === "ol") {
                updatedSections[index] = { type: "ol", list: parseOlContent(section.content) };
            }

            else if(section.type === "image"){
                if(section.fileToImgur){
                    // Upload to imgur
                    console.log("fileToImgur", section.fileToImgur)
                    imgurPostReq.push(uploadToImgur(section.fileToImgur));
                    imgurReqIndex.push(index);
                    // const form = new FormData();
                    // console.log("fileToImgur", section.fileToImgur)
                    // form.append("image", section.fileToImgur)
                    // await axios({...postImgurOptions, data: form})
                    // .then((res)=>{
                    //   const imgUrl = `https://i.imgur.com/${res.data.data.id}.png`;
                    //   console.log("imgUrl", imgUrl)
                      
                    // });
                }
            }
        });
        if (imgurPostReq.length > 0) {
            console.log("Upload length", imgurPostReq.length)
            await axios.all(imgurPostReq)
                .then((results) => {
                    results.forEach((res, index) => {
                        const url = `https://i.imgur.com/${res.data.data.id}.png`;
                        updatedSections[imgurReqIndex[index]] = {type: "image" , url };
                    });
                }).then(()=>{
                    const updatedDocument = this.props.doc!=="advisor" ? {sections: updatedSections}:{
                        profilePic,
                        sections: updatedSections,
                    };
                    
                    db.collection("pages").doc(this.props.doc).set(
                        updatedDocument
                    );
                }
                ).then(() =>{
                    console.log("Document successfully written!");
                    this.props.onLeave();
                })
                .catch((error) =>{
                    console.error("Error writing document: ", error);
                });
        }
        else {
            const updatedDocument = this.props.doc!=="advisor" ? {sections: updatedSections}:{
                profilePic,
                sections: updatedSections,
            };
        
            db.collection("pages").doc(this.props.doc).set(updatedDocument)
                .then( () =>{
                    console.log("Document successfully written!");
                    this.props.onLeave();
                })
                .catch((error) =>{
                    console.error("Error writing document: ", error);
                });
            }
    }

    onDeleteSection = (index) => () =>{
        this.setState((prevState)=>{
            let sections = prevState.sections;
            sections.splice(index, 1);
            return {sections}
        });
    }

    onAddSection = (sectionType) => () => {
        console.log(`section type: ${sectionType}`)
        switch (sectionType) {
            case "header":
                console.log("add header");
                this.setState((prevState) => {
                    const newSections = prevState.sections;
                    newSections.push({ type: "header", content: "" });
                    return { ...prevState, sections: newSections };
                });
                break;
            case "text":
                console.log("add text")
                this.setState((prevState) => {
                    const newSections = prevState.sections;
                    newSections.push({ type: "text", content: "" });
                    return { ...prevState, sections: newSections };
                });
                break;
            case "image":
                console.log("add image")

                this.setState((prevState) => {
                    const newSections = prevState.sections;
                    newSections.push({ type: "image", url: null, filetoImgur: null });
                    return { ...prevState, sections: newSections };
                });
                break;
            case "paragraph":
                console.log("add paragraph")

                this.setState((prevState) => {
                    const newSections = prevState.sections;
                    newSections.push({ type: "paragraph", header: null, content: "" });
                    return { ...prevState, sections: newSections };
                });
                break;

            case "ol":
                console.log("add ol")

                this.setState((prevState) => {
                    const newSections = prevState.sections;
                    newSections.push({ type: "ol", content: "" });
                    return { ...prevState, sections: newSections };
                });
                break;

            case "ul":
                console.log("add ul")

                this.setState((prevState) => {
                    const newSections = prevState.sections;
                    newSections.push({ type: "ul", content: "" });
                    return { ...prevState, sections: newSections };
                });
                break;
            default:
                break;

        }
    }

    captureFile = (index) => (event) => {
        if (event.target.files.length < 1) {
            return;
        }
        const file = event.target.files[0];
        console.log(`index is ${index}`)
        console.log("file is ", file)
        this.setState((prevState) => {
            let uploadedImage = prevState.sections[index];
            uploadedImage.url = URL.createObjectURL(file);
            uploadedImage.fileToImgur = file;
            return { ...prevState, sections: [...prevState.sections.slice(0, index), uploadedImage, ...prevState.sections.slice(index + 1)] }
        });
    }

    onContentChange = (option) => (event) => {
        // console.log(event.target.value)
        const { index } = option;
        let words = event.target.value
        this.setState((prevState) => {
            let newSec = prevState.sections[index];
            if (newSec.type === "text") {
                newSec.content = words;
            }
            else if (newSec.type === "header") {
                newSec.header = words;

            }
            else if (newSec.type === "paragraph") {
                if (option.isHeader) {
                    newSec.header = words;
                }
                else {
                    newSec.content = words;
                }

            }
            else if (newSec.type === "ol") {
                newSec.content = words;


            }
            else if (newSec.type === "ul") {
                newSec.content = words;

            }
            return { ...prevState, sections: [...prevState.sections.slice(0, index), newSec, ...prevState.sections.slice(index + 1)] }

        });
    }



    render() {
        return (
            <div className="container-fluid text-justify">
                {
                    this.state.sections.map((section, index) => {
                        switch (section.type) {
                            case "header":
                                return <EditHeader
                                    onDeleteSection={this.onDeleteSection}
                                    header={section.header}
                                    sectionIndex={index}
                                    onContentChange={this.onContentChange}

                                />
                            case "text":
                                return <EditText
                                    onDeleteSection={this.onDeleteSection}
                                    content={section.content}
                                    sectionIndex={index}
                                    onContentChange={this.onContentChange}

                                />
                            case "image":
                                return <EditeImage
                                    onDeleteSection={this.onDeleteSection}
                                    captureFile={this.captureFile}
                                    sectionIndex={index}
                                    url={section.url}
                                />
                            case "paragraph":
                                return <EditParagraph
                                    onDeleteSection={this.onDeleteSection}
                                    header={section.header}
                                    content={section.content}
                                    sectionIndex={index}
                                    onContentChange={this.onContentChange}


                                />
                            case "ol":
                                return <EditOl
                                    onDeleteSection={this.onDeleteSection}
                                    content={section.content}
                                    sectionIndex={index}
                                    onContentChange={this.onContentChange}


                                />
                            case "ul":
                                return <EditUl
                                    onDeleteSection={this.onDeleteSection}
                                    content={section.content}
                                    sectionIndex={index}
                                    onContentChange={this.onContentChange}


                                />
                            default:
                                return null;

                        }
                    })
                }
                <EditTool
                    onAddSection={this.onAddSection}
                />
                <div className="row">
                    <button className="button-normal col " onClick={this.onSaveAndExit}><i className="far fa-save fa-2x"></i> <p> 儲存並更新頁面</p></button>
                </div>
            </div>
        )
    }
}


// Editor.contextType = AuthContext;

export default Editor;
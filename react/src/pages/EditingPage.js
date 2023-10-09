import Header from "../common/Header";
import Sidebar from "../common/Sidebar";
import React,{ useState, useRef, useEffect } from "react";
import DownloadBar from "../common/DownloadBar";
import FileUploadBar from "../components/FileUploadBar";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Stage, Layer, Image, Text, Transformer } from 'react-konva';
import useImage from 'use-image';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addImage } from "../Redux/actions";
import { displayData } from "../functions/displayData";
import TextBar from "../components/TextBar";

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

function downloadURI(uri, name) {
  var link = document.createElement('a');
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

function EditingPage() {
    let[state, setState] = useState({
      isDragging: false,
      x: 50,
      y: 50,
    });


    // var text1 = new Konva.Text({
    //   x: 50,
    //   y: 70,
    //   fontSize: 30,
    //   text: 'keepRatio = true',
    //   draggable: true,
    // });
    // layer.add(text1);

    // var tr1 = new Konva.Transformer({
    //   nodes: [text1],
    //   keepRatio: true,
    //   enabledAnchors: [
    //     'top-left',
    //     'top-right',
    //     'bottom-left',
    //     'bottom-right',
    //   ],
    // });




    let[isSelected, setIsSelected] = useState(false);
    let[isTexting, setIsTexting] = useState(false);
    let[inputText, setInputText] = useState("");
    let[isUploading, setIsUploading] = useState(false);
    const stageRef = useRef();
    const [images, setImages] = useState([]);
    const uploadImages = useSelector((state) => state.images);
    const dragUrl = useRef();

    const dispatch = useDispatch();
    useEffect(() => {
      displayData(dispatch, addImage);
    }, []);

    const shapeRef = useRef();
    const trRef = useRef();

  useEffect(() => {
    if (isSelected) {
      // we need to attach transformer manually
      trRef.current.nodes([shapeRef.current]);
      trRef.current.getLayer().batchDraw();
    }
  }, [isSelected]);


    const handleExport = () => {
      const uri = stageRef.current.toDataURL();
      console.log(uri);
      downloadURI(uri, 'image.png');
    };

    return (
        <div>
            <Header />
            <ToastContainer />
            <div className="main-editor">
              <div className="upload-menu">
                {uploadImages.map((image, index) => (
                  <img
                  key={index}
                  alt=""
                  src={image}
                  draggable="true"
                  width={150}
                  onDragStart={(e) => {
                  dragUrl.current = e.target.src;
                  }}
                />
                ))}
              </div>

              <div className="left-menu">
                <Sidebar setIsTexting={setIsTexting} setIsUploading={setIsUploading} />
                {isTexting && (
                  <TextBar setInputText={setInputText} />
                )}
                {isUploading && <FileUploadBar />}


                <div className="canvas"
                    onDrop={(e) => {
                      e.preventDefault();
                      // register event position
                      stageRef.current.setPointersPositions(e);
                      // add image
                      setImages(
                      images.concat([
                      {
                          ...stageRef.current.getPointerPosition(),
                          src: dragUrl.current,
                      },
                    ])
                  );
                }}
                onDragOver={(e) => e.preventDefault()}
              >
              <Stage
                  width={855}
                  height={550}
                  style={{ border: '2px dashed grey' }}
                  ref={stageRef}
              >
                <Layer>
                  {images.map((image) => {
                      return <URLImage image={image} />;
                   })}
                   <Text
                      className="text"
                      ref={shapeRef}
                      text={inputText}
                      onSelect={() => {
                        setIsSelected(true);
                      }}
                      fontSize={30}
                      x={state.x}
                      y={state.y}
                      draggable
                      fill={state.isDragging ? 'black' : 'white'}
                      onDragStart={() => {
                        setState({
                          isDragging: true,
                        });
                      }}
                      onDragEnd={(e) => {
                        setState({
                          isDragging: false,
                          x: e.target.x(),
                          y: e.target.y(),
                        });
                      }}
                    />
                    {isSelected && (
                      <Transformer
                      ref={trRef}
                      enabledAnchors={['top-left', 'top-right', 'bottom-left', 'bottom-right']}
                      keepRatio={true}
                      enabledTransforms={['rotate', 'scale']}
                      boundBoxFunc={(oldBox, newBox) => {
                        if (newBox.width < 5 || newBox.height < 5) {
                          return oldBox;
                        }
                        return newBox;
                      }}
                      onTransformEnd={(e) => {
                        setState({
                          x: e.target.x(),
                          y: e.target.y(),
                        });
                      }}
                    />
                    )}
                </Layer>
            </Stage>
          </div>
              </div>
              <div className="right-menu">
                <DownloadBar downloadFunc={handleExport} />
              </div>
            </div>
        </div>
    )
}

export default EditingPage;
import React, { useContext, useState } from "react";
import { GlobPreference } from "../App";
import CssEditor from "../components/CssEditor";
import DesignScreen from "../components/DesignScreen";
import FullCssEditor from "../components/FullCssEditor";
import LeftToolBar from "../components/LeftToolBar";
import RightToolBar from "../components/RightToolBar";
import { getBody, getCssStyles } from "../utils/common";

import beautify from "beautify";

import AceEditor from "react-ace";
import "ace-builds";
import "ace-builds/webpack-resolver";
import "ace-builds/src-noconflict/mode-html";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-language_tools";

function Designer() {
  //   useEffect(() => {
  //     console.log(getBody());
  //   }, []);

  const [is_output_window_open, setis_output_window_open] = useState(false);
  const [ouput_code, setouput_code] = useState("");

  return (
    <>
      <div className="abort-mobile-device">
        <span>Please Open in Desktop/laptop device for better Experience</span>
      </div>
      {is_output_window_open && (
        <div
          className="output-wrapper"
          onClick={(e) => {
            if (e.target.classList.contains("output-wrapper")) {
              setis_output_window_open(false);
            }
          }}
        >
          <div className="window-title">
            <i
              className="fas fa-window-close"
              onClick={(e) => setis_output_window_open(false)}
            ></i>
          </div>
          <AceEditor
            fontSize="1.25rem"
            mode="html"
            theme="monokai"
            name="output-ace"
            editorProps={{ $blockScrolling: true }}
            //   enableBasicAutocompletion={true}
            enableLiveAutocompletion={true}
            value={ouput_code}
            enableSnippets={true}
            readOnly={true}
          />
          <div className="window-bottom"></div>
        </div>
      )}

      <div className="main">
        <div className="main-inner">
          {/* <!-- Navebar(header) start --> */}
          <div className="navbar">
            {/* <!-- menu button --> */}
            <div className="nav-button hide">
              <i className="far fa-bars"></i>
              <span>Menu</span>
            </div>
            {/* <!-- menu button end --> */}

            {/* <!-- Designer Name(brand) --> */}
            <div className="nav-button disabled">Web Designer</div>

            {/* <!-- Code Download button --> */}
            <div
              className="nav-button"
              id="download-button"
              title="download current design"
              onClick={(e) => {
                var mydom = document.createElement("html");
                // mydom.innerHTML = "";

                var x = document.getElementById("designRoot");

                var iframe = x.contentWindow || x.contentDocument;
                if (iframe.document) iframe = iframe.document;

                mydom.appendChild(iframe.head.cloneNode(true));
                mydom.appendChild(iframe.body.cloneNode(true));

                setouput_code(
                  beautify(
                    beautify(mydom.outerHTML, {
                      format: "css",
                    }),
                    { format: "html" }
                  )
                );

                setis_output_window_open(true);
              }}
            >
              <i className="fad fa-code"></i>
              <span>Code</span>
            </div>
            {/* <!-- download button end --> */}

            {/* <!-- reset button --> */}
            <div className="nav-button" id="delete-design">
              <i className="far fa-trash"></i>
              <span>Delete Design</span>
            </div>
          </div>
          {/* <!-- navbar end --> */}

          {/* <!-- main body start --> */}
          <div className="body-wrapper">
            <div className="body">
              {/* <!-- left toolbar start --> */}

              <LeftToolBar />

              <DesignScreen />

              {/* <!-- Override Css Block Start--> */}
              <RightToolBar />
            </div>
          </div>

          <CssEditor />
          <FullCssEditor />
        </div>
      </div>
    </>
  );
}

export default Designer;

import React from "react";
import Modal from 'react-bootstrap/Modal';
import store from "../../store"

const InfoModal = (props) => {
    let isOpen = !1;
    let infoOpen = isInfoOpen(props.infoModal);
    if (infoOpen) {
        isOpen = !0;
    }

    function isInfoOpen (infoModal) {
        let isOpen = !1;
        if(infoModal !== !1) {
            isOpen = !0;
        }
        return isOpen
    }
    if(isOpen) {
        return (
            <Modal 
                    size="sm"
                    className="modal"
                    style={{"top": "50px", "left": "100px", "right": "0", "position": "relative", "float": "right"}}
                    show={isOpen} onHide={() => {store.dispatch({type: "CLOSE_INFO"})}}
                    animation={false}
            >
                <Modal.Header closeButton>
                <Modal.Title>
                    {props.infoModal.title}
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {props.infoModal.text}
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        );
    } else {
    return null;
    }
}
export default InfoModal;
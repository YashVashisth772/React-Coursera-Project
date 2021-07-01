// import React, { Component } from 'react';
// import { Button ,Modal, ModalHeader, ModalBody,
//     Form, FormGroup, Input, Label , Row, Col} from 'reactstrap';
// import { Control, LocalForm, Errors } from 'react-redux-form';
// import {RenderComments, dishDetail} from './DishdetailComponent ';

// const required = (val) => val && val.length;
// const maxLength = (len) => (val) => !(val) || (val.length <= len);
// const minLength = (len) => (val) => val && (val.length >= len);
// const isNumber = (val) => !isNaN(Number(val));
// const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

// class ComponentForm extends Component {
//     constructor(props){
//         super(props);
//         this.state= {
//             isCommentModal : false
//         }
//         this.toggleModal = this.toggleModal.bind(this);
//     }
//     toggleModal() {
//         this.setState({
//             isCommentModal: !this.state.isCommentModal
//         })
//     }
//     handleSubmit(values) {
//         this.toggleModal();
//         this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
//     }

//     render(){
//     return(
        
//         <React.Fragment>
//             <Button color="secondary" outline onClick={this.toggleModal}>
//                     <span className="fa fa-pencil fa-lg">Submit Comment</span>
//                 </Button>
//             <Modal isOpen={this.state.isCommentModal} toggle={this.toggleModal}>
//                 <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
//                 <ModalBody>
//                     <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
//                         <Row className="form-group">
//                             <Label htmlFor="rating" md={12}>Rating</Label>
//                             <Col md={12}>
//                                 <Control.select model=".rating" name="rating" className="form-control">
//                                     <option>1</option>
//                                     <option>2</option>
//                                     <option>3</option>
//                                     <option>4</option>
//                                     <option>5</option>
//                                 </Control.select>
//                             </Col>
//                         </Row>
//                         <Row className="form-group">
//                             <Label htmlFor="yourname" md={12}>Your Name</Label>
//                             <Col md={12}>
//                                 <Control.text model=".yourname" id="yourname" name="yourname"
//                                     placeholder="Your Name"
//                                     className="form-control"
//                                     validators={{
//                                         required, minLength: minLength(3), maxLength: maxLength(15)
//                                     }}
//                                 />
//                                 <Errors
//                                     className="text-danger"
//                                     model=".yourname"
//                                     show="touched"
//                                     messages={{
//                                         required: 'Required',
//                                         minLength: 'Must be greater than 3 characters',
//                                         maxLength: 'Must be 15 characters or less'
//                                     }}
//                                 />
//                             </Col>
//                         </Row>
//                         <Row className="form-group">
//                             <Label htmlFor="comment" md={12}>Comment</Label>
//                             <Col>
//                                 <Control.textarea model=".message" md={10} id="message" name="message"
//                                     rows="6"
//                                     className="form-control" />
//                             </Col>
//                         </Row>
//                         <Button type="submit" value="submit" color="primary">
//                             Submit
//                         </Button>
//                     </LocalForm>
//                 </ModalBody>
//             </Modal>
//         </React.Fragment>
//         )
//     }
// }

// export default ComponentForm; 
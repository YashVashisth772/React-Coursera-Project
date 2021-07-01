import React ,{Component, useState} from 'react';
// import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';
import { Card, CardImg, CardText, CardBody,
    CardTitle, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { Link } from 'react-router-dom';
// import CommentForm22 from './CommentFormComponent';
import { Button ,Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label , Row, Col} from 'reactstrap';
import { Control, LocalForm, Errors } from 'react-redux-form';
import { Loading } from './LoadingComponent';
import { baseUrl } from '../shared/baseUrl';



const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
const isNumber = (val) => !isNaN(Number(val));
const validEmail = (val) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val);

export class CommentForm extends Component {
    constructor(props){
        super(props);
        this.state= {
            isCommentModal : false
        }
        this.toggleModal = this.toggleModal.bind(this);
    }
    toggleModal() {
        this.setState({
            isCommentModal: !this.state.isCommentModal
        })
    }
    handleSubmit(values) {
        this.toggleModal();
        this.props.addComment(this.props.dishId, values.rating, values.author, values.comment);
        console.log( 'this.props.dishId, values.rating, values.author, values.comment',this.props.dishId, values.rating, values.author, values.comment);
    }
    

    render(){
    return(
        
        <React.Fragment>
           <Button color="secondary" outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg">Submit Comment</span>
                </Button>
            <Modal isOpen={this.state.isCommentModal} toggle={this.toggleModal}>
                <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                <ModalBody>
                    <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label md={12} htmlFor="rating">Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" className="form-control">
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>
                                </Col>
                            </Row>
                        <Row className="form-group">
                            <Label htmlFor="author" md={12}>Your Name</Label>
                            <Col md={12}>
                                <Control.text model=".author" id="author" name="author"
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(3), maxLength: maxLength(15)
                                    }}
                                />
                                <Errors
                                    className="text-danger"
                                    model=".author"
                                    show="touched"
                                    messages={{
                                        required: 'Required',
                                        minLength: 'Must be greater than 3 characters',
                                        maxLength: 'Must be 15 characters or less'
                                    }}
                                />
                            </Col>
                        </Row>
                        <Row className="form-group">
                            <Label htmlFor="comment" md={12}>Comment</Label>
                            <Col>
                                <Control.textarea model=".comment" md={10} id="comment" name="comment"
                                    rows="6"
                                    className="form-control" />
                            </Col>
                        </Row>
                        <Button type="submit" value="submit" color="primary">
                            Submit
                        </Button>
                    </LocalForm>
                </ModalBody>
            </Modal>
        </React.Fragment>
        )
    }
}

function RenderDish({dish}){
    if(dish){
        return(
            <div>
                <Card>
                    <CardImg top src={baseUrl + dish.image} alt={dish.name} />
                    <CardBody>
                    <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
    else{
        return <div></div>
    }
}

function RenderComments({comments, addComment , dishId}){
        if(comments){
            let commentListItems = comments.map((comment) => {
                return(
                    <li key={comment.id}>
                        <div>
                            {console.log('yash ',{dishId})}
                            {console.log('yash comment',{comment})}

                            <p>{comment.comment}</p>
                            <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
                        </div>
                    </li>
                );
            });
            return(
                <div >
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {commentListItems}
                    </ul>
                    <CommentForm dishId={dishId} addComment={addComment} />
                </div>
            )
        }else{
            return <div></div>
        }

}
function Counter(){
    const [count , setCount] = useState(0)

    // const increment=() => {
    //     setCount = prevCount +1;
    // }
    return(
        <div className="container">
        <div className="col-12 md-12">
             <Button color="secondary" size="lg" outline onClick={()=> setCount(count+1)}>
             <span className="fa fa-paper-plane ">+</span>
             </Button>
            {/* <button onClick={()=> setCount(count+1)}>+</button> */}
            <h3 style={{color:'green'}}>Count is: &nbsp;&nbsp;&nbsp;{count}</h3>
        </div></div>
    )
}


const DishDetail = (props) => {
    if (props.isLoading) {
            return(
                <div className="container">
                    <div className="row">            
                        <Loading />
                    </div>
                </div>
            );
        }
        else if (props.errMess) {
            return(
                <div className="container">
                    <div className="row">            
                        <h4>{props.errMess}</h4>
                    </div>
                </div>
            );
        }
    else if(props.dish){
        return (
            <div className="container">
                <div className="row">
                    <Breadcrumb>
                        <BreadcrumbItem><Link to="/menu">Menu</Link></BreadcrumbItem>
                        <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                    </Breadcrumb>
                    <div className="col-12">
                        <h3>{props.dish.name}</h3>
                        <hr />
                    </div>                
                </div>
                <div className="row">
                    <div className="col-12 col-md-5 m-1">
                        <RenderDish dish={props.dish} />
                    </div>
                    <div className="col-12 col-md-5 m-1">
                        <RenderComments comments={props.comments} 
                        addComment= {props.addComment}
                        dishId={props.dish.id} />
                    </div>
                    <div className="row">
                        <Counter />
                    </div>
                </div>
                </div>
                
        )
    }else{ 
        return <div></div>
    }
}


export default DishDetail;





//Class based component form
// class DishDetail extends Component {
    
//     renderDish(dish) {
//         // const dish = this.props.choosenDish; 
//         if(dish){
//             return(
//                 <div className="col-12 col-md-5 m-1">
//                     <Card>
//                         <CardImg top src={dish.image} alt={dish.name} />
//                         <CardBody>
//                         <CardTitle>{dish.name}</CardTitle>
//                             <CardText>{dish.description}</CardText>
//                         </CardBody>
//                     </Card>
//                 </div>
//             )
//         }
//         else{
//             return <div></div>
//         }
//     }
//     renderComments(dish){
//         const comments = dish;
//         if(comments){
//             const commentListItems = comments.map((comment) => {
//                 return(
//                     <li key={comment.id}>
//                         <div>
//                             <p>{comment.comment}</p>
//                             <p>-- {comment.author} , {new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'short', day: '2-digit'}).format(new Date(Date.parse(comment.date)))}</p>
//                         </div>
//                     </li>
//                 );
//             });
//             return(
//                 <div className="col-12 col-md-5 m-1">
//                     <h4>Comments</h4>
//                     <ul className="list-unstyled">
//                         {commentListItems}
//                     </ul>
//                 </div>
//             )
//         }else{
//             return <div></div>
//         }
           
//     }

//     render() {      
       
//             return (
//                 this.props.dish &&
//                 <div className="conainer">
//                     <div className="row">
//                         {this.renderDish(this.props.dish)}
//                         {this.renderComments(this.props.dish.comments)}
//                     </div>
//                 </div>
              
//             )

//     }
// }


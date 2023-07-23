import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Edit from './edit/edit';
import Modal from "react-modal";


export default function List(props) {

    const customStyles = {
        content: {
          top: "20%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
          minWidth: "50%",
          maxWidth: "50%",
        },
      };


    const [editModalIsOpen, setEditModalIsOpen] = React.useState(false);
    const [id, setId] = React.useState("");
    const [name, setName] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [email, setEmail] = React.useState("");
    const openEditModal = (id, name, password, email) => {
        setId(id);
        setName(name);
        setPassword(password);
        setEmail(email);
        setEditModalIsOpen(true);
    };
    
    function closeModal() {
        setEditModalIsOpen(false);
    }

    const tableBody = props !== undefined && props.displayFlag  ? (
            <TableBody>
                {props.searchResult.map((v) => 
                    <TableRow>
                    <TableCell align="left">{v.id}</TableCell>
                    <TableCell align="left">{v.name}</TableCell>
                    <TableCell align="left">{v.password}</TableCell>
                    <TableCell align="left">{v.mailAdress}</TableCell>
                    <TableCell align="center">
                        <Button variant="outlined" 
                                onClick={() => {openEditModal(v.id, v.name, v.password, v.mailAdress)}}>
                            Edit
                        </Button>
                    </TableCell>
                </TableRow>
            )}
            </TableBody>

        
    ) : null;

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell align="left">id</TableCell>
                        <TableCell align="left">名前</TableCell>
                        <TableCell align="left">パスワード</TableCell>
                        <TableCell align="left">メールアドレス</TableCell>
                        <TableCell align="left"></TableCell>
                    </TableRow>
                </TableHead>
                {tableBody}
            </Table>
            <div>
                <Modal
                isOpen={editModalIsOpen}
                onRequestClose={closeModal}
                style={customStyles}
                contentLabel="Example Modal"
                >
                <Edit  setEditModalIsOpen={setEditModalIsOpen} id={id} name={name} setName={setName} password={password} setPassword={setPassword} email={email} setEmail={setEmail}/>
                </Modal>
            </div>

        </TableContainer>
    );
}
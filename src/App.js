import React from "react";
import api from './service/api';

//Importaçoes para tabela
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

// Importações para alerta
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

import './App.css';

export default function App() {

  //Modal
  const [open, setOpen] = React.useState(false);
  const [id, setID] = React.useState([]);
  const [username, setUsername] = React.useState([]);
  const [posicao, setPosicao] = React.useState([]);

  function handleClickOpen(i, us) {
    const indc = i-1;
    setPosicao(indc);
    setUsername(us);
    setID(i);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //Chamada da API
  const [users, setUser] = React.useState([]);

  React.useEffect(() => {
    api.get('/users')
    .then(response => {
      setUser(response.data.map(userss => {
        let indice = userss.id - 1;

        if (indice%3==0 && indice%5==0) {
          userss.company.name = "TC/SENCOM"
        }else {
          if (indice%3==0) {
            userss.company.name = "TC";
          }
          else if (indice%5==0){
            userss.company.name = "SENCOM"
          }
          else {
            userss.company.name = "Sem Empresa"
          }
        }
        return userss
      }));
    });
  }, 
  []);

  return (
    <div className="layout">
    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 400 }} aria-label="sticky table">
      <TableHead>
        <TableRow>
          <TableCell>Nome</TableCell>
          <TableCell text-align="center">Email</TableCell>
          <TableCell text-align="center">Telefone</TableCell>
          <TableCell text-align="center">Endereço Completo</TableCell>
          <TableCell text-align="center">Cidade</TableCell>
          <TableCell text-align="center">Empresa</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {users.map((user) => (
          <TableRow
            hover
            key={user.id}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            onClick={() => handleClickOpen(user.id, user.username)}
          >
            <TableCell component="th" scope="row" >{user.name}</TableCell>
            <TableCell text-align="center">{user.email}</TableCell>
            <TableCell text-align="center">{user.phone}</TableCell>
            <TableCell text-align="center">{user.address.street} {user.address.suite} {user.address.zipcode}</TableCell>
            <TableCell text-align="center">{user.address.city}</TableCell>
            <TableCell text-align="center">{user.company.name}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Alerta!"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            O Username é: {username}<br></br>
            ID: {id} <br></br>
            Posição: {posicao}
          </DialogContentText>   
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </div>
  </div>
  );
}
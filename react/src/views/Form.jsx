import React, { useState } from 'react'
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';
import NewForm from "./new/new";

export default function Form(props) {
    const [title, setTitle] = useState('');

    const funSetTitle = (e) => {
        setTitle(() => e.target.value);
    }

    const funPost = () => {
        const params = new URLSearchParams();
        params.append('title', title);
        axios.post('/api', params)
            .then(function (res) {
                console.log(res)
                if(res.data.message != undefined){
                        // props.setDisplay({
                        //     ...props.display,
                        //     id: v.id,
                        //     name: v.name,
                        //     password: v.password,
                        //     mailAdress: v.mailAdress,
                        // });
                    props.setDisplay(res.data.message);
                    props.setFlag(true);
                }else{
                    props.setFlag(false);
                }
            })
            .catch(function (error) {
                console.log("error", error);
            });
    }

    return (
        <Grid container rowSpacing={1} position={'static'} marginTop={"15px"} marginLeft={"5px"}> 
            <form>
                <Grid item>
                    <TextField
                        label="名前"
                        value={title}
                        onChange={funSetTitle}
                    />
                </Grid>                
                <Grid item>
                    <Button variant="contained" onClick={funPost}>検索</Button>
                </Grid>
            </form>
        </Grid>
    )
}
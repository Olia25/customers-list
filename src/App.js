import React, {useState} from 'react';
import './App.css';
import { allClients, defaultImage } from './constants'
import 'antd/dist/antd.css'
import {Avatar, Row, Col, Input, Button, Tooltip} from 'antd'
import { UserOutlined, UngroupOutlined, PictureOutlined, UserAddOutlined, DeleteOutlined } from '@ant-design/icons';
import {ADD_CLIENT, CHANGE_DATA, DELETE_CLIENT, CLEAR_LIST} from "./reducers/customerList";
import {connect} from 'react-redux'



function App(props) {

  const [clients] = useState(allClients)
    console.log("clients", clients)
  const [selectedId, setSelectedId] = useState()
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [image, setImage] = useState("")
  const [creatingMode, setCreatingMode] = useState(true)

    const changeData = () => {
        props.changeDataInList( selectedId, name, age, image )
        setName(name)
        setAge(age)
        setImage(image)
    }

    const selectedClient = clients.find(({id})=> id === selectedId)

    const onClickClient = (elem) =>{
        setSelectedId(elem.id)
        setName(elem.name)
        setAge(elem.age)
        setImage(elem.image)
    }

    const setOn = () => {
        setCreatingMode(false)
        setName('')
        setAge('')
        setImage('')
    }
    const setOff = () => setCreatingMode(true)

    const deleteClient = (elem) =>{
       props.deleteClient(elem)
        setName('')
        setAge('')
        setImage('')
    }
    console.log("props.testStore", props.testStore)

    const getMaxId = ()=>{
      let maxId;
        if(props.testStore.length === 0){
            return maxId = 1
        } else {
            maxId = props.testStore.reduce((sum, elem)=> sum < elem.id ? elem.id : sum,
                props.testStore[0].id)
            return maxId += 1
        }
    }

  return (
    <Row>
      <Col span={10} offset={2} className="leftList">
        {props.testStore.map(elem=>(
            <Row
               key={elem.id}
               onClick={()=>onClickClient(elem)}
               className={selectedId===elem.id ? "borderOnClick" : null}
            >
                <Col span={16} className="marginList">
                    <h1 className="aaa"> {elem.name}</h1>
                    <Avatar
                        size={70}
                        src={elem.image || defaultImage}
                    />
                </Col>
                <Col span={6}>
                    <Tooltip  title="Delete">
                        <Button type="text" icon={<DeleteOutlined twoToneColor="#eb2f96"/> }
                                onClick={()=> {
                                    deleteClient(elem.id)
                                }} />
                    </Tooltip>
                </Col>
            </Row>
            )
        )}
      </Col>

      <Col span={8} offset={2} className="rightList ">
        <div className="backgroundCover">
            <Row className="box" >
                <Col span={18} offset={3} >
                Name:
                <Input
                    size="small"
                    // placeholder="new name"
                    prefix={<UserOutlined twoToneColor="#eb2f96" />}
                    value={name}
                    onChange={({target: {value}})=> setName(value)}
                />
                Age:
                <Input
                    size="small"
                    prefix={<UngroupOutlined />}
                    value={age}
                    onChange={({target: {value}})=> setAge(value)}
                />
                Image:
                <Input
                    size="small"
                    prefix={<PictureOutlined />}
                    value={image}
                    onChange={({target: {value}})=> setImage(value)}
                />
                </Col>
            </Row>
            {selectedClient &&
            <div>
                {creatingMode ? (
                    <Row justify="center">
                        <img className="imgReturn" src = {selectedClient.image || defaultImage} />
                    </Row>

                ) : null
                }
                <Row justify="center">
                    <Button
                        className="editButton"
                        ghost
                        onClick={changeData}
                    >
                        Edit
                    </Button>
                </Row>

            </div>
            }
            {creatingMode ? (
                <Row justify="center">
                    <Button icon={<UserAddOutlined />} onClick={setOn} className="modeButton">
                        Create user
                    </Button>
                </Row>
                ) : (
                <Row  justify="center">
                    <Col span={8} offset={2}>
                        <Button onClick={()=> props.addClient(getMaxId(),name,age,image)} className="modeButton"> Save user </Button>
                    </Col>
                    <Col span={8} offset={2}>
                        <Button onClick={setOff} className="modeButton">Cancel</Button>
                    </Col>
                </Row>
                )}
                <Row justify="center">
                    <Button onClick={props.clearList}>Clear</Button>
                </Row>

            </div>

        </Col>
    </Row>
    );
}

export default connect(
    state => ({
        testStore : state.customerList
    }),
    dispatch =>({
        changeDataInList: (selectedId, name, age, image) => {
            dispatch({ type: CHANGE_DATA, payload: {selectedId, name, age, image }  });
        },
        addClient: (id, name, age, image) => {
            dispatch({ type: ADD_CLIENT, payload: {id, name, age, image}});
        },
        deleteClient: (id) => {
            dispatch({type: DELETE_CLIENT, payload: id});
        },
        clearList:() => {
            dispatch({ type: CLEAR_LIST})
        }
    })
)(App);

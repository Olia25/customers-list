import React, {useState} from 'react';
import './App.css';
import { allClients, defaultImage } from './constants'
import 'antd/dist/antd.css'
import {Avatar, Row, Col, Input, Button, Tooltip} from 'antd'
import { UserOutlined, UngroupOutlined, PictureOutlined, UserAddOutlined, DeleteOutlined } from '@ant-design/icons';



function App() {

  const [clients, setClients] = useState(allClients)
  const [selectedId, setSelectedId] = useState()
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [image, setImage] = useState("")
  const [creatingMode, setCreatingMode] = useState(true)

    const changeData = () => {
        setClients(
            clients.map(elem =>{
                if(selectedId === elem.id){
                    return {...elem, name:name, age:age, image:image}
                }
                return elem
            })
        )
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

    const addNewClient = () => {
      let maxId = clients.reduce((sum, elem)=> sum < elem.id ? elem.id : sum,
            clients[0].id)
        clients.filter(elem=> setSelectedId( null))

        setClients(
            [...clients, {id: maxId += 1, name, age, image}]
        )
        setCreatingMode(true)
    }

    const deleteClient = (deletedId) =>{
        setClients(
            clients.filter(({id})=> id !== deletedId)
        )
        setName('')
        setAge('')
        setImage('')
    }

  return (
    <Row>
      <Col span={10} offset={2} className="leftList">
        {clients.map(elem=>(
            <Row
               key={elem.id}
               onClick={()=>onClickClient(elem)}
               className={selectedId===elem.id ? "borderOnClick" : null}
            >
                <Col span={16} className="marginList">
                    <h1 className="aaa">{elem.id}. {elem.name}</h1>
                    <Avatar
                        size={70}
                        src={elem.image || defaultImage}
                    />
                </Col>
                <Col span={6}>
                    <Tooltip  title="Delete">
                        <Button type="text" icon={<DeleteOutlined twoToneColor="#eb2f96"/> } onClick={()=>deleteClient(elem.id)} />
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
                        <Button onClick={addNewClient} className="modeButton"> Save user </Button>
                    </Col>
                    <Col span={8} offset={2}>
                        <Button onClick={setOff} className="modeButton">Cancel</Button>
                    </Col>
                </Row>
                )}
            </div>
        </Col>
    </Row>
    );
}

export default App;

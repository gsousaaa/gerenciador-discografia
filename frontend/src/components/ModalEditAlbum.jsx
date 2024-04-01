import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Box,
} from "@chakra-ui/react";

import { useState } from "react";
import axios from 'axios';
import { useToast } from "@chakra-ui/toast";

export const ModalEditAlbum = ({ data, setData, selectedAlbumId, isOpen, onClose, fetchAlbums }) => {
    const [newAlbumName, setNewAlbumName] = useState("");
    const toast = useToast()

    const handleSave = async () => {
        if (!newAlbumName) return

        try {

            const response = await axios.put(`http://localhost:8000/album/${selectedAlbumId}`, { album_name: newAlbumName }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            const updatedData = data.map(album => {
                if (album.album_id === selectedAlbumId) {
                    return { ...album, album_name: newAlbumName }
                }

                return album
            })

            setData(updatedData);
            fetchAlbums()
            onClose()

            toast({
                title: "Album editado",
                description: "O album foi editado com sucesso.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            console.error('Erro ao editar o álbum:', err);

            const erro = err.response.data.error
            toast({
                title: "Erro ao editar album",
                description: erro,
                status: "error",
                duration: 5000,
                isClosable: true,
            });
        }
    };


    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay>
                    <ModalContent>
                        <ModalHeader>Editar album</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl display='flex' flexDir='column' gap={4}>
                                <Box>
                                    <FormLabel>Nome do Album</FormLabel>
                                    <Input type="text" value={newAlbumName} onChange={(e) => setNewAlbumName(e.target.value)} />
                                </Box>
                            </FormControl>
                        </ModalBody>
                        <ModalFooter justifyContent='start'>
                            <Button colorScheme="green" mr={3} onClick={handleSave}>SALVAR</Button>
                            <Button colorScheme="red" onClick={onClose}>CANCELAR</Button>
                        </ModalFooter>
                    </ModalContent>
                </ModalOverlay>
            </Modal>


        </>
    )

}
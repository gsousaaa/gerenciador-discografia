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

export const ModalNewAlbum = ({ data, setData, setDataEdit, dataEdit, isOpen, onClose, fetchAlbums }) => {
    const [album_name, setAlbumName] = useState("");
    const toast = useToast()

    const handleSave = async () => {
        if (!album_name) return


        try {
            // Verifica se o álbum já existe
            if (data.some(album => album.album_name === album_name)) {
                console.error('Este álbum já existe.');
                return;
            }

            const response = await axios.post('http://localhost:8000/createalbum', { album_name }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setData([...data, response.data]);
            fetchAlbums()
            localStorage.setItem("albums", JSON.stringify([...data, response.data]));
            onClose();

            toast({
                title: "Album adicionado",
                description: "O album foi adicionado com sucesso.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            console.error('Erro ao adicionar novo álbum:', err);

            const erro = err.response.data.error
            toast({
                title: "Erro ao excluir a música",
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
                        <ModalHeader>Novo Album</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl display='flex' flexDir='column' gap={4}>
                                <Box>
                                    <FormLabel>Nome do Album</FormLabel>
                                    <Input type="text" value={album_name} onChange={(e) => setAlbumName(e.target.value)} />
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
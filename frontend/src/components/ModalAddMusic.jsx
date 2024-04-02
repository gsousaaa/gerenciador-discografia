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
import { URL } from "../constants/url";

export const ModalNewMusic = ({ isOpen, onClose, selectedAlbumId, data, setData }) => {
    const [music_name, setMusicName] = useState('');
    const toast = useToast();

    const handleSave = async () => {

        if (!music_name || !selectedAlbumId) return


        try {
            // Verifica se o álbum correspondente existe
            const album = data.find(album => album.id === selectedAlbumId);
            if (!album) {
                console.error('Álbum não encontrado');
                return;
            }

            // Verifica se a lista de músicas do álbum está definida
            const musics = album.musics || [];

            // Verifica se a música já existe no álbum
            const existingMusic = musics.find(music => music.music_name === music_name);
            if (existingMusic) {
                console.error('Essa música já foi adicionada ao álbum');
                return;
            }

            const response = await axios.post(`${URL}/album/${selectedAlbumId}/music`, { music_name }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            // Atualize o estado após adicionar a música e fechar o modal
            onClose();

            setData(prevData => {
                const updatedData = prevData.map(album => {
                    if (album.id === selectedAlbumId) {
                        return {
                            ...album,
                            musics: [...musics, response.data] // Adiciona a nova música à lista de músicas do álbum
                        };
                    }
                    return album;
                });

                return updatedData;
            });

            toast({
                title: "Música adicionada",
                description: "A música foi adicionada com sucesso.",
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (err) {
            console.error('Erro ao adicionar nova música:', err);

            const erro = err.response.data.error
            toast({
                title: "Erro ao adicionar a música",
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
                        <ModalHeader>Adicionar Música</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <FormControl display='flex' flexDir='column' gap={4}>
                                <Box>
                                    <FormLabel>Nome da Música</FormLabel>
                                    <Input type="text" value={music_name} onChange={(e) => setMusicName(e.target.value)} />
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
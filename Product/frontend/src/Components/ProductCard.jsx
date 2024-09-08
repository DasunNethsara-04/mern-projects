import { DeleteIcon, EditIcon } from '@chakra-ui/icons'
import { Box, Heading, HStack, VStack, Input, Button, IconButton, Image, Modal, ModalBody, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, ModalContent, ModalFooter } from '@chakra-ui/react'
import React, { useState } from 'react'
import { useProductStore } from '../store/products';

const ProductCard = ({ product }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.800");
    const { deleteProduct } = useProductStore();
    const { updateProduct } = useProductStore();
    const toast = useToast();
    const [updatedProduct, setUpdatedProduct] = useState(product);

    const handleDelete = async (id) => {
        const { success, message } = await deleteProduct(id);
        if (success) {
            toast({
                title: 'Success',
                description: message,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    }

    const handleUpdate = async (id, updatedProduct) => {
        const { success, message } = await updateProduct(id, updatedProduct);
        if (success) {
            toast({
                title: 'Success',
                description: message || 'Product updated successfully!',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
        } else {
            toast({
                title: 'Error',
                description: message || 'Error found while updating the product details!',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
        onClose();
    }

    return (
        <Box
            shadow="lg"
            rounded="lg"
            overflow="hidden"
            transition="all 0.3s"
            _hover={{ transform: "translateY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w='full' objectFit='cover' />

            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2}>{product.name}</Heading>
                <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
                    ${product.price}
                </Text>
                <HStack spacing={2}>
                    <IconButton icon={<EditIcon />} onClick={onOpen} colorScheme='blue' />
                    <IconButton icon={<DeleteIcon />} onClick={() => handleDelete(product._id)} colorScheme='red' />
                </HStack>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="Product Name"
                                name="name"
                                value={updatedProduct.name}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
                            />
                            <Input
                                placeholder="Product Price"
                                name="price"
                                value={updatedProduct.price}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
                            />
                            <Input
                                placeholder="Product Image URL"
                                name="image"
                                value={updatedProduct.image}
                                onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={() => handleUpdate(product._id, updatedProduct)}>
                            Update
                        </Button>
                        <Button variant='ghost' onClick={onClose}>Close</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box >
    )
}

export default ProductCard
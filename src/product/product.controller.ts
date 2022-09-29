import { Controller, Get, Post, Put, Delete, Res, HttpStatus, Body, Param, NotFoundException, Query} from '@nestjs/common';
import { createPrivateKey } from 'crypto';

import { ProductService } from './product.service'
import { CreateProductDto } from './dto/product.dto';

@Controller('product')
export class ProductController {


    constructor(private productService: ProductService) {}

     @Post('/create')
     async createPost(@Res() res, @Body() createProductDto: CreateProductDto){
        const product = await this.productService.createProduct(createProductDto);
        console.log(CreateProductDto);
        return res.status(HttpStatus.OK).json({
            messaje : 'Producto Creado Exitosamente',
            product : product
        });
     }

     @Get('/')
     async getProducts(@Res() res ) {
        const products = await this.productService.getProducts();
        return res.status(HttpStatus.OK).json({
            products
        })        
     }

     @Get('/:productID')
     async getProduct(@Res() res, @Param('productID')productID) {
        const product = await this.productService.getProduct(productID);
        if (!product) throw new NotFoundException ('El producto no existe');
        return res.status(HttpStatus.OK).json(product);
     }

     @Delete('/delete')
     async deleteProduct(@Res() res, @Query('productID')productID) {
        const productDeleted = await this.productService.deleteProduct(productID);
        if (!productDeleted) throw new NotFoundException ('El producto no existe');
        return res.status(HttpStatus.OK).JSON({
            message:'Producto borrado',
            productDeleted
        });
     }

     @Put('/update')
     async updateProduct(@Res() res, @Body() createProductDto: CreateProductDto, @Query('productID')productID,) {
        const productUpdate = await this.productService.updateProduct(productID,createProductDto);
        if (!productUpdate) throw new NotFoundException ('El producto no existe');
        return res.status(HttpStatus.OK).json({
            message:'Producto actualizado',
            productUpdate
        });
     }


    }

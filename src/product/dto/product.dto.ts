export class CreateProductDto{
    readonly name: string; 
    readonly descripction : string;
    readonly imageURL : string;
    readonly price: number;
    readonly createdAt: Date;   
}
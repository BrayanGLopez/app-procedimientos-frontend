import { Engineer } from "./engineer";
import { Product } from "./product";
import { Type } from "./type";

export class DocumentCreate {
    codigoDocument!:string;
    urlDocument!:string;
    product!:Product;
    type!:Type;
    engineer!:Engineer;
}

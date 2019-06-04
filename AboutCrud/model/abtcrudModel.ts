interface parasnli{
    paragraph:object;
    lists:object;
}
interface title{
    titleName:string;
    titleParagraph:parasnli[];
}
interface subTitle{
    subTitleName:string;
    subTitleParagraphs:object;
}
export interface abtcrudModel{
    date:string;
    currentStatus:string;
    aboutTitle:title[];
    aboutSubTitle:subTitle[];
}

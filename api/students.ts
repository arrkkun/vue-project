import requst from '@/utils/request'
export const pageQuery =(params : any) {
    requst({
        'url':'/api/students',
        method:'get',
        params:params
    })

}

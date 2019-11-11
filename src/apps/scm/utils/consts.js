export const auditStatus = {
	audit: { value: 1, label: '已审核' },
	normal: { value: 2, label: '未审核' },
	reject: { value: 3, label: '驳回' },
}

export const voucherType = {
	sale: { value: 1, label: '销售单' },
	unsale: { value: 2, label: '销售退货单' },
}

export const ticketType = {
	pp:{id:200000000000050, code:'001', name:'增值税普通发票'},
	zp:{id:200000000000051, code:'002', name:'增值税专用发票'},
	qt:{id:200000000000052, code:'003', name:'其他票据'},
}

export const settlementType = {
    xj: { id: 1, name: "现金" },
    yh: { id: 2, name: "银行" },
    wx: { id: 3, name: "微信"},
    zfb: { id: 4, name: "支付宝"},
	zbzf: { id: 0, name: "暂不支付"}
}
import { SAVAEVILDATAINFO, DELEVILDATAINFO } from '../constant'
interface evilData {
    // 疫情数据
    evilDataInfo: {
        evilData: []
    }
}
class evilDataInit {
    evilControlData: evilData = {
        evilDataInfo: {
            evilData: []
        }
    }
}

export default function evilControl(preState = new evilDataInit, action: any) {
    const { type, data } = action
    switch (type) {
        case SAVAEVILDATAINFO:
            preState.evilControlData.evilDataInfo.evilData = data
            return { ...preState }
        case DELEVILDATAINFO:
            return { ...preState }
        default:
            return preState

    }

}
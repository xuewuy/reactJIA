import { Map, fromJS } from 'immutable'
import { expect } from 'chai'

import * as reducer from '../../../../src/apps/fi/accSubjects/accSubjects/reducer'
import * as api from '../../../../src/apps/fi/accSubjects/accSubjects/api'
import * as util from '../../../../src/apps/dynamicUI/util'

describe('会计科目', () => {
    it('新增科目测试：addSubject', () => {
     let subjectList = [
      {
          "orgId":1767824778921984,
          "id":50199,
          "parentId":50056,
          "grade":2,
          "isEndNode":false,
          "accountTypeId":93,
          "code":"530102",
          "name":"政府补助",
          "gradeName":"营业外收入-政府补助",
          "helpCode":"YYWSR-ZFBZ",
          "balanceDirection":1,
          "cashTypeId":97,
          "isAuxAccCalc":false,
          "isAuxAccDepartment":false,
          "isAuxAccPerson":false,
          "isAuxAccCustomer":false,
          "isAuxAccSupplier":false,
          "isAuxAccInventory":false,
          "isAuxAccProject":false,
          "isAuxAccBankAccount":false,
          "isQuantityCalc":false,
          "isMultiCalc":false,
          "status":true,
          "isSystem":true,
          "accountingStandardsId":19,
          "industryId":1,
          "accountTypeName":"损益",
          "balanceDirectionName":"贷",
          "cashTypeName":"",
          "codeAndName":"530102 营业外收入-政府补助"
      }]


     let firstSubject =
             {"orgId":1767824778921984,
              "parentId":50199,
              "grade":3,
              "isEndNode":1,
              "accountTypeId":93,
              "code":"53010201",
              "name":"政府补助-贷",
              "balanceDirection":1,
              "cashTypeId":97,
              "isAuxAccCalc":true,
              "isAuxAccDepartment":true,
              "isAuxAccPerson":true,
              "isAuxAccCustomer":true,
              "isAuxAccSupplier":true,
              "isAuxAccInventory":true,
              "isAuxAccProject":true,
              "isAuxAccBankAccount":false,
              "isQuantityCalc":true,
              "unitId":2,
              "isMultiCalc":true,
              "currencyId":6,
              "status":true,
              "isSystem":0,
              "accountingStandardsId":19,
              "industryId":1}

      let state = Map(),
          meta = api.getMeta(),
          data = api.getData()

      data.list = subjectList
      state = state
          .set('meta', fromJS(meta))
          .set('meta_runtime', fromJS(meta))
          .set('data', fromJS(data))
          .set('data_runtime', fromJS(data))

      //插入第一条科目
      const nextState = reducer.addSubject(state, firstSubject, 50199)
      const subList = nextState.get('data_runtime').get('list')
      expect(subList).to.be.ok
      expect(subList.get(1).toJS().code).to.be.deep.equal(firstSubject.code)
      expect(subList.size).to.be.equal(2)

      let secondSubject =
              {"orgId":1767824778921984,
               "parentId":50199,
               "grade":3,
               "isEndNode":1,
               "accountTypeId":93,
               "code":"53010202",
               "name":"政府补助-借",
               "balanceDirection":1,
               "cashTypeId":97,
               "isAuxAccCalc":true,
               "isAuxAccDepartment":true,
               "isAuxAccPerson":true,
               "isAuxAccCustomer":true,
               "isAuxAccSupplier":true,
               "isAuxAccInventory":true,
               "isAuxAccProject":true,
               "isAuxAccBankAccount":false,
               "isQuantityCalc":true,
               "unitId":2,
               "isMultiCalc":true,
               "currencyId":6,
               "status":true,
               "isSystem":0,
               "accountingStandardsId":19,
               "industryId":1}

      //新增第二个科目
      const nextNextState = reducer.addSubject(nextState, secondSubject, 50199)
      expect(nextNextState.get('data_runtime').get('list').get(2).toJS().name).to.equal('政府补助-借')

    })

    it('修改科目测试：updateSubject', () => {
      let subjectList = [
       {
           "orgId":1767824778921984,
           "id":50199,
           "parentId":50056,
           "grade":2,
           "isEndNode":false,
           "accountTypeId":93,
           "code":"530102",
           "name":"政府补助",
           "gradeName":"营业外收入-政府补助",
           "helpCode":"YYWSR-ZFBZ",
           "balanceDirection":1,
           "cashTypeId":97,
           "isAuxAccCalc":false,
           "isAuxAccDepartment":false,
           "isAuxAccPerson":false,
           "isAuxAccCustomer":false,
           "isAuxAccSupplier":false,
           "isAuxAccInventory":false,
           "isAuxAccProject":false,
           "isAuxAccBankAccount":false,
           "isQuantityCalc":false,
           "isMultiCalc":false,
           "status":true,
           "isSystem":true,
           "accountingStandardsId":19,
           "industryId":1,
           "accountTypeName":"损益",
           "balanceDirectionName":"贷",
           "cashTypeName":"",
           "codeAndName":"530102 营业外收入-政府补助"
       }, {"orgId":1767824778921984,
          "parentId":50199,
          "id":50200,
          "grade":3,
          "isEndNode":1,
          "accountTypeId":93,
          "code":"53010201",
          "name":"政府补助-贷",
          "balanceDirection":1,
          "cashTypeId":97,
          "isAuxAccCalc":true,
          "isAuxAccDepartment":true,
          "isAuxAccPerson":true,
          "isAuxAccCustomer":true,
          "isAuxAccSupplier":true,
          "isAuxAccInventory":true,
          "isAuxAccProject":true,
          "isAuxAccBankAccount":false,
          "isQuantityCalc":true,
          "unitId":2,
          "isMultiCalc":true,
          "currencyId":6,
          "status":true,
          "isSystem":0,
          "accountingStandardsId":19,
          "industryId":1}]


      let updatingSubject = {"orgId":1767824778921984,
         "parentId":50199,
         "id":50200,
         "grade":3,
         "isEndNode":1,
         "accountTypeId":93,
         "code":"53010201",
         "name":"政府补助-贷111",
         "balanceDirection":1,
         "cashTypeId":97,
         "isAuxAccCalc":true,
         "isAuxAccDepartment":true,
         "isAuxAccPerson":true,
         "isAuxAccCustomer":true,
         "isAuxAccSupplier":true,
         "isAuxAccInventory":true,
         "isAuxAccProject":true,
         "isAuxAccBankAccount":false,
         "isQuantityCalc":true,
         "unitId":2,
         "isMultiCalc":true,
         "currencyId":6,
         "status":true,
         "isSystem":1,
         "accountingStandardsId":19,
         "industryId":1}

       let state = Map(),
           meta = api.getMeta(),
           data = api.getData()

       data.list = subjectList
       state = state
           .set('meta', fromJS(meta))
           .set('meta_runtime', fromJS(meta))
           .set('data', fromJS(data))
           .set('data_runtime', fromJS(data))
           .set('parsedMeta', util.parseMeta(fromJS(meta)))

       //插入第一条科目
       const nextState = reducer.updateSubject(state, Map(updatingSubject))
       const subList = nextState.getIn(['data_runtime','list'])

       expect(subList.get(1).toJS().name).to.be.equal('政府补助-贷111')
       expect(subList.get(1).toJS().isSystem).to.be.equal(1)
    })

    it('删除科目测试：deleteSubject', () => {
        let subjectList = [
         {
             "orgId":1767824778921984,
             "id":50199,
             "parentId":50056,
             "grade":2,
             "isEndNode":false,
             "accountTypeId":93,
             "code":"530102",
             "name":"政府补助",
             "gradeName":"营业外收入-政府补助",
             "helpCode":"YYWSR-ZFBZ",
             "balanceDirection":1,
             "cashTypeId":97,
             "isAuxAccCalc":false,
             "isAuxAccDepartment":false,
             "isAuxAccPerson":false,
             "isAuxAccCustomer":false,
             "isAuxAccSupplier":false,
             "isAuxAccInventory":false,
             "isAuxAccProject":false,
             "isAuxAccBankAccount":false,
             "isQuantityCalc":false,
             "isMultiCalc":false,
             "status":1,
             "isSystem":true,
             "accountingStandardsId":19,
             "industryId":1,
             "accountTypeName":"损益",
             "balanceDirectionName":"贷",
             "cashTypeName":"",
             "codeAndName":"530102 营业外收入-政府补助"
         }, {"orgId":1767824778921984,
            "parentId":50199,
            "id":50200,
            "grade":3,
            "isEndNode":1,
            "accountTypeId":93,
            "code":"53010201",
            "name":"政府补助-贷",
            "balanceDirection":1,
            "cashTypeId":97,
            "isAuxAccCalc":true,
            "isAuxAccDepartment":true,
            "isAuxAccPerson":true,
            "isAuxAccCustomer":true,
            "isAuxAccSupplier":true,
            "isAuxAccInventory":true,
            "isAuxAccProject":true,
            "isAuxAccBankAccount":false,
            "isQuantityCalc":true,
            "unitId":2,
            "isMultiCalc":true,
            "currencyId":6,
            "status":1,
            "isSystem":0,
            "accountingStandardsId":19,
            "industryId":1
         }, {"orgId":1767824778921984,
               "parentId":50199,
               "id":50201,
               "grade":3,
               "isEndNode":1,
               "accountTypeId":93,
               "code":"53010201",
               "name":"政府补助-借",
               "balanceDirection":1,
               "cashTypeId":97,
               "isAuxAccCalc":true,
               "isAuxAccDepartment":true,
               "isAuxAccPerson":true,
               "isAuxAccCustomer":true,
               "isAuxAccSupplier":true,
               "isAuxAccInventory":true,
               "isAuxAccProject":true,
               "isAuxAccBankAccount":false,
               "isQuantityCalc":true,
               "unitId":2,
               "isMultiCalc":true,
               "currencyId":6,
               "status":1,
               "isSystem":0,
               "accountingStandardsId":19,
               "industryId":1}]

          let state = Map(),
              meta = api.getMeta(),
              data = api.getData()

          data.list = subjectList
          state = state
              .set('meta', fromJS(meta))
              .set('meta_runtime', fromJS(meta))
              .set('data', fromJS(data))
              .set('data_runtime', fromJS(data))
              .set('parsedMeta', util.parseMeta(fromJS(meta)))

        let accountId = 50200,
            parentId = 50199,
            isDelCurSubject = true,
            rowIndex = 1

         //删除科目
         const nextState = reducer.deleteSubject(state, accountId, parentId, isDelCurSubject, rowIndex)
         const subList = nextState.getIn(['data_runtime','list'])

         expect(subList.size).to.be.equal(2)
         //还存在同级科目时，则不更改父级科目为末级科目
         expect(subList.get(0).get('isEndNode')).to.be.equal(false)

         //科目已被使用，将会修改状态为【停用】
         accountId = 50201
         parentId = 50199
         isDelCurSubject = false
         rowIndex = 1
         const nextNextState = reducer.deleteSubject(nextState, accountId, parentId, isDelCurSubject, rowIndex)
         const list = nextNextState.getIn(['data_runtime','list'])

         //判断科目状态是否为0【停用】
         expect(list.get(1).get('status')).to.be.equal(0)
      })
 })

describe('期初余额', () => {
    it('新增辅助核算项目、外币项目测试', () => {
      const subjects = [
            {
                "isAuxAccCalc":false,
                "accountId":50044,
                "direction":1,
                "rowStatus":false,
                "isEndNode":true,
                "accountTypeId":91,
                "accountCode":"3001",
                "accountName":"实收资本",
                "accountGrade":1,
                "directionName":"贷",
                "accIsAuxAccCalc":true,
                "isAuxAccDepartment":true,
                "isAuxAccPerson":false,
                "isAuxAccCustomer":false,
                "isAuxAccSupplier":false,
                "isAuxAccInventory":true,
                "isAuxAccProject":false,
                "isAuxAccBankAccount":false,
                "isQuantityCalc":false,
                "isMultiCalc":false,
                "accStatus":true,
                "yearBeginQuantity":0,
                "yearBeginAmount":0,
                "yearBeginOrigAmount":0
            },
            {
                "isAuxAccCalc":false,
                "accountId":50045,
                "direction":1,
                "rowStatus":false,
                "isEndNode":true,
                "accountTypeId":91,
                "accountCode":"3002",
                "accountName":"资本公积",
                "accountGrade":1,
                "directionName":"贷",
                "accIsAuxAccCalc":false,
                "isAuxAccDepartment":false,
                "isAuxAccPerson":false,
                "isAuxAccCustomer":false,
                "isAuxAccSupplier":false,
                "isAuxAccInventory":false,
                "isAuxAccProject":false,
                "isAuxAccBankAccount":false,
                "isQuantityCalc":false,
                "isMultiCalc":false,
                "accStatus":true,
                "yearBeginQuantity":0,
                "yearBeginAmount":0,
                "yearBeginOrigAmount":0
            },
            {
                "isAuxAccCalc":false,
                "accountId":50046,
                "direction":1,
                "rowStatus":false,
                "isEndNode":false,
                "accountTypeId":91,
                "accountCode":"3101",
                "accountName":"盈余公积",
                "accountGrade":1,
                "directionName":"贷",
                "accIsAuxAccCalc":false,
                "isAuxAccDepartment":false,
                "isAuxAccPerson":false,
                "isAuxAccCustomer":false,
                "isAuxAccSupplier":false,
                "isAuxAccInventory":false,
                "isAuxAccProject":false,
                "isAuxAccBankAccount":false,
                "isQuantityCalc":false,
                "isMultiCalc":false,
                "accStatus":true,
                "yearBeginQuantity":0,
                "yearBeginAmount":0,
                "yearBeginOrigAmount":0
            }]

        let auxItems = [
            {
                "id":1807105528694784,
                "orgId":1783310746191872,
                "currentYear":2016,
                "isAuxAccCalc":true,
                "ts":"2017-01-13 14:25:37",
                "accountId":50044,
                "direction":1,
                "departmentId":1783310901381122,
                "inventoryId":1783346192844800,
                "rowStatus":false,
                "isEndNode":true,
                "accountTypeId":91,
                "accountCode":"3001",
                "accountName":"实收资本",
                "directionName":"贷",
                "accIsAuxAccCalc":true,
                "isAuxAccDepartment":true,
                "isAuxAccPerson":false,
                "isAuxAccCustomer":false,
                "isAuxAccSupplier":false,
                "isAuxAccInventory":true,
                "isAuxAccProject":false,
                "isAuxAccBankAccount":false,
                "isQuantityCalc":false,
                "isMultiCalc":false,
                "accStatus":true,
                "departmentCode":"05",
                "departmentName":"销售部",
                "inventoryCode":"001",
                "inventoryName":"电流表",
                "yearBeginQuantity":0,
                "yearBeginAmount":0,
                "yearBeginOrigAmount":0
            },
            {
                "id":1807105529022464,
                "orgId":1783310746191872,
                "currentYear":2016,
                "isAuxAccCalc":true,
                "ts":"2017-01-13 14:25:37",
                "accountId":50044,
                "direction":1,
                "departmentId":1783310901381122,
                "inventoryId":1783347573753856,
                "rowStatus":false,
                "isEndNode":true,
                "accountTypeId":91,
                "accountCode":"3001",
                "accountName":"实收资本",
                "directionName":"贷",
                "accIsAuxAccCalc":true,
                "isAuxAccDepartment":true,
                "isAuxAccPerson":false,
                "isAuxAccCustomer":false,
                "isAuxAccSupplier":false,
                "isAuxAccInventory":true,
                "isAuxAccProject":false,
                "isAuxAccBankAccount":false,
                "isQuantityCalc":false,
                "isMultiCalc":false,
                "accStatus":true,
                "departmentCode":"05",
                "departmentName":"销售部",
                "inventoryCode":"002",
                "inventoryName":"配电盘",
                "yearBeginQuantity":0,
                "yearBeginAmount":0,
                "yearBeginOrigAmount":0
            },
            {
                "id":1807105529022465,
                "orgId":1783310746191872,
                "currentYear":2016,
                "isAuxAccCalc":false,
                "ts":"2017-01-13 14:25:37",
                "accountId":50044,
                "direction":1,
                "rowStatus":false,
                "isEndNode":true,
                "accountTypeId":91,
                "accountCode":"3001",
                "accountName":"实收资本",
                "accountGrade":1,
                "directionName":"贷",
                "accIsAuxAccCalc":true,
                "isAuxAccDepartment":true,
                "isAuxAccPerson":false,
                "isAuxAccCustomer":false,
                "isAuxAccSupplier":false,
                "isAuxAccInventory":true,
                "isAuxAccProject":false,
                "isAuxAccBankAccount":false,
                "isQuantityCalc":false,
                "isMultiCalc":false,
                "accStatus":true,
                "yearBeginQuantity":0,
                "yearBeginAmount":0,
                "yearBeginOrigAmount":0
            }
        ]
        let rowIndex = 1,
            isSelectCurrency = false,
            accountId = 50044

        let state = Map(),
            meta = api.getMeta(),
            data = api.getData()

        data.list = subjects
        state = state
            .set('meta', fromJS(meta))
            .set('meta_runtime', fromJS(meta))
            .set('data', fromJS(data))
            .set('data_runtime', fromJS(data))
            .set('parsedMeta', util.parseMeta(fromJS(meta)))

        const nextState = reducer.addAuxCalcItemRows(state, auxItems, rowIndex, isSelectCurrency, accountId)

        expect(nextState.getIn(['data_runtime','list']).size).to.be.equal(5)
    })

    it('期初余额更新测试', () => {
        let subjects = [
            {
              accIsAuxAccCalc:true,
              accStatus:true,
              accountCode:"3001",
              accountCodeCombine:"3001",
              accountGrade:1,
              accountId:50044,
              accountName:"实收资本",
              accountTypeId:91,
              amountCr:"",
              amountDr:"",
              currentYear:2016,
              direction:1,
              directionName:"贷",
              id:1807105529022465,
              isAuxAccBankAccount:false,
              isAuxAccCalc:false,
              isAuxAccCustomer:false,
              isAuxAccDepartment:true,
              isAuxAccInventory:true,
              isAuxAccPerson:false,
              isAuxAccProject:false,
              isAuxAccSupplier:false,
              isEndNode:true,
              isMultiCalc:false,
              isQuantityCalc:false,
              orgId:1783310746191872,
              origAmountCr:"",
              origAmountDr:"",
              periodBeginAmount:"10",
              periodBeginOrigAmount:"",
              periodBeginQuantity:"",
              quantityCr:"",
              quantityDr:"",
              rowStatus:false,
              ts:"2017-01-13 15:20:49",
              yearBeginAmount:"10",
              yearBeginOrigAmount:"",
              yearBeginQuantity:""
            },
            {
              "periodBeginAmount":"",
              "periodBeginOrigAmount":"",
              "accountTypeId":91,
              "isMultiCalc":false,
              "yearBeginAmount":"",
              "yearBeginOrigAmount":"",
              "isAuxAccCustomer":false,
              "accountCodeCombine":"",
              "amountDr":"",
              "origAmountDr":"",
              "inventoryName":"电流表",
              "amountCr":"",
              "accountId":50044,
              "origAmountCr":"",
              "inventoryCode":"001",
              "isAuxAccBankAccount":false,
              "directionName":"贷",
              "isQuantityCalc":false,
              "rowStatus":false,
              "departmentId":1783310901381122,
              "isAuxAccProject":false,
              "periodBeginQuantity":"",
              "isEndNode":true,
              "accStatus":true,
              "isAuxAccSupplier":false,
              "isAuxAccInventory":true,
              "currentYear":2016,
              "yearBeginQuantity":"",
              "inventoryId":1783346192844800,
              "accountName":"销售部_电流表",
              "quantityDr":"",
              "isAuxAccDepartment":true,
              "accountCode":"3001_05_001",
              "quantityCr":"",
              "id":1807105528694784,
              "isAuxAccPerson":false,
              "isAuxAccCalc":true,
              "departmentName":"销售部",
              "accIsAuxAccCalc":true,
              "departmentCode":"05",
              "ts":"2017-01-13 15:20:49",
              "orgId":1783310746191872,
              "direction":1
          },{
              "periodBeginAmount":"10",
              "periodBeginOrigAmount":"",
              "accountTypeId":91,
              "isMultiCalc":false,
              "yearBeginAmount":"10",
              "yearBeginOrigAmount":"",
              "isAuxAccCustomer":false,
              "accountCodeCombine":"",
              "amountDr":"",
              "origAmountDr":"",
              "inventoryName":"配电盘",
              "amountCr":"",
              "accountId":50044,
              "origAmountCr":"",
              "inventoryCode":"002",
              "isAuxAccBankAccount":false,
              "directionName":"贷",
              "isQuantityCalc":false,
              "rowStatus":false,
              "departmentId":1783310901381122,
              "isAuxAccProject":false,
              "periodBeginQuantity":"20",
              "isEndNode":true,
              "accStatus":true,
              "isAuxAccSupplier":false,
              "isAuxAccInventory":true,
              "currentYear":2016,
              "yearBeginQuantity":"",
              "inventoryId":1783347573753856,
              "accountName":"销售部_配电盘",
              "quantityDr":"",
              "isAuxAccDepartment":true,
              "accountCode":"3001_05_002",
              "quantityCr":"",
              "id":1807105529022464,
              "isAuxAccPerson":false,
              "isAuxAccCalc":true,
              "departmentName":"销售部",
              "accIsAuxAccCalc":true,
              "departmentCode":"05",
              "ts":"2017-01-13 14:40:02",
              "orgId":1783310746191872,
              "direction":1
          }]

        let state = Map(),
            meta = api.getMeta(),
            data = api.getData()

        data.list = subjects
        state = state
            .set('meta', fromJS(meta))
            .set('meta_runtime', fromJS(meta))
            .set('data', fromJS(data))
            .set('data_runtime', fromJS(data))
            .set('parsedMeta', util.parseMeta(fromJS(meta)))

        let relatedRows = [
          {
              accIsAuxAccCalc:true	,
              accStatus:true,
              accountCode:"3001",
              accountGrade:1,
              accountId:50044,
              accountName:"实收资本",
              accountTypeId:91,
              currentYear:2016,
              direction:1,
              directionName:"贷",
              id:1807105529022465,
              isAuxAccBankAccount:false,
              isAuxAccCalc:false,
              isAuxAccCustomer:false,
              isAuxAccDepartment:true,
              isAuxAccInventory:true,
              isAuxAccPerson:false,
              isAuxAccProject:false,
              isAuxAccSupplier:false,
              isEndNode:true,
              isMultiCalc:false,
              isQuantityCalc:false,
              orgId:1783310746191872,
              periodBeginAmount:"110.00",
              rowStatus:false,
              ts:"2017-01-13 15:24:35",
              yearBeginAmount:"110.00",
              yearBeginOrigAmount:"",
              yearBeginQuantity:""
        }, {
              accIsAuxAccCalc:true	,
              accStatus:true	,
              accountCode:"3001_05_001"	,
              accountId:50044	,
              accountName:"实收资本"	,
              accountTypeId:91	,
              currentYear:2016	,
              departmentCode:"05"	,
              departmentId:1783310901381122	,
              departmentName:"销售部"	,
              direction:1	,
              directionName:"贷"	,
              id:1807105528694784	,
              inventoryCode:"001"	,
              inventoryId:1783346192844800	,
              inventoryName:"电流表"	,
              isAuxAccBankAccount:false	,
              isAuxAccCalc:true	,
              isAuxAccCustomer:false	,
              isAuxAccDepartment:true	,
              isAuxAccInventory:true	,
              isAuxAccPerson:false	,
              isAuxAccProject:false	,
              isAuxAccSupplier:false	,
              isEndNode:true	,
              isMultiCalc:false	,
              isQuantityCalc:false	,
              orgId:1783310746191872	,
              periodBeginAmount:"100.00"	,
              rowStatus:false	,
              ts:"2017-01-13 15:24:35",
              yearBeginAmount:"100.00",
              yearBeginOrigAmount:"",
              yearBeginQuantity:""
        }]

        let curEditField = 'periodBeginAmount'
        let tryCacuBalance = {
            "direction":0,
            "periodBeginAmountDrN":3433020,
            "periodBeginAmountCrN":157,
            "yearBeginAmountDrN":3439605,
            "yearBeginAmountCrN":50,
            "periodBeginAmountDr":"3,433,020.00",
            "periodBeginAmountCr":"157.00",
            "yearBeginAmountDr":"3,439,605.00",
            "yearBeginAmountCr":"50.00"
        }

        //期初余额的更新
        const nextState = reducer.updateBeginBalanceRows(state, relatedRows, curEditField, Map(tryCacuBalance))

        //当前编辑科目期初余额、年初余额更新
        expect(nextState.getIn(['data_runtime','list']).get(1).get(curEditField)).to.be.equal('100.00')
        expect(nextState.getIn(['data_runtime','list']).get(1).get('yearBeginAmount')).to.be.equal('100.00')

        //当前编辑科目的上级科目期初余额、年初余额更新
        expect(nextState.getIn(['data_runtime','list']).get(0).get(curEditField)).to.be.equal('110.00')
        expect(nextState.getIn(['data_runtime','list']).get(0).get('yearBeginAmount')).to.be.equal('110.00')
    })

    it('期初余额的数量更新测试', () => {
        let subjects = [
            {
              accIsAuxAccCalc:true,
              accStatus:true,
              accountCode:"3001",
              accountCodeCombine:"3001",
              accountGrade:1,
              accountId:50044,
              accountName:"实收资本",
              accountTypeId:91,
              amountCr:"",
              amountDr:"",
              currentYear:2016,
              direction:1,
              directionName:"贷",
              id:1807105529022465,
              isAuxAccBankAccount:false,
              isAuxAccCalc:false,
              isAuxAccCustomer:false,
              isAuxAccDepartment:true,
              isAuxAccInventory:true,
              isAuxAccPerson:false,
              isAuxAccProject:false,
              isAuxAccSupplier:false,
              isEndNode:true,
              isMultiCalc:false,
              isQuantityCalc:false,
              orgId:1783310746191872,
              origAmountCr:"",
              origAmountDr:"",
              periodBeginAmount:"10",
              periodBeginOrigAmount:"",
              periodBeginQuantity:"",
              quantityCr:"",
              quantityDr:"",
              rowStatus:false,
              ts:"2017-01-13 15:20:49",
              yearBeginAmount:"10",
              yearBeginOrigAmount:"",
              yearBeginQuantity:""
            },
            {
              "periodBeginAmount":"",
              "periodBeginOrigAmount":"",
              "accountTypeId":91,
              "isMultiCalc":false,
              "yearBeginAmount":"",
              "yearBeginOrigAmount":"",
              "isAuxAccCustomer":false,
              "accountCodeCombine":"",
              "amountDr":"",
              "origAmountDr":"",
              "inventoryName":"电流表",
              "amountCr":"",
              "accountId":50044,
              "origAmountCr":"",
              "inventoryCode":"001",
              "isAuxAccBankAccount":false,
              "directionName":"贷",
              "isQuantityCalc":false,
              "rowStatus":false,
              "departmentId":1783310901381122,
              "isAuxAccProject":false,
              "periodBeginQuantity":"",
              "isEndNode":true,
              "accStatus":true,
              "isAuxAccSupplier":false,
              "isAuxAccInventory":true,
              "currentYear":2016,
              "yearBeginQuantity":"",
              "inventoryId":1783346192844800,
              "accountName":"销售部_电流表",
              "quantityDr":"",
              "isAuxAccDepartment":true,
              "accountCode":"3001_05_001",
              "quantityCr":"",
              "id":1807105528694784,
              "isAuxAccPerson":false,
              "isAuxAccCalc":true,
              "departmentName":"销售部",
              "accIsAuxAccCalc":true,
              "departmentCode":"05",
              "ts":"2017-01-13 15:20:49",
              "orgId":1783310746191872,
              "direction":1
          },{
              "periodBeginAmount":"10",
              "periodBeginOrigAmount":"",
              "accountTypeId":91,
              "isMultiCalc":false,
              "yearBeginAmount":"10",
              "yearBeginOrigAmount":"",
              "isAuxAccCustomer":false,
              "accountCodeCombine":"",
              "amountDr":"",
              "origAmountDr":"",
              "inventoryName":"配电盘",
              "amountCr":"",
              "accountId":50044,
              "origAmountCr":"",
              "inventoryCode":"002",
              "isAuxAccBankAccount":false,
              "directionName":"贷",
              "isQuantityCalc":false,
              "rowStatus":false,
              "departmentId":1783310901381122,
              "isAuxAccProject":false,
              "periodBeginQuantity":"20",
              "isEndNode":true,
              "accStatus":true,
              "isAuxAccSupplier":false,
              "isAuxAccInventory":true,
              "currentYear":2016,
              "yearBeginQuantity":"",
              "inventoryId":1783347573753856,
              "accountName":"销售部_配电盘",
              "quantityDr":"",
              "isAuxAccDepartment":true,
              "accountCode":"3001_05_002",
              "quantityCr":"",
              "id":1807105529022464,
              "isAuxAccPerson":false,
              "isAuxAccCalc":true,
              "departmentName":"销售部",
              "accIsAuxAccCalc":true,
              "departmentCode":"05",
              "ts":"2017-01-13 14:40:02",
              "orgId":1783310746191872,
              "direction":1
          }]

        let state = Map(),
            meta = api.getMeta(),
            data = api.getData()

        data.list = subjects
        state = state
            .set('meta', fromJS(meta))
            .set('meta_runtime', fromJS(meta))
            .set('data', fromJS(data))
            .set('data_runtime', fromJS(data))
            .set('parsedMeta', util.parseMeta(fromJS(meta)))

        //设置期初余额数量值为200
        let relatedRows = [
          {
              accIsAuxAccCalc:true	,
              accStatus:true,
              accountCode:"3001",
              accountGrade:1,
              accountId:50044,
              accountName:"实收资本",
              accountTypeId:91,
              currentYear:2016,
              direction:1,
              directionName:"贷",
              id:1807105529022465,
              isAuxAccBankAccount:false,
              isAuxAccCalc:false,
              isAuxAccCustomer:false,
              isAuxAccDepartment:true,
              isAuxAccInventory:true,
              isAuxAccPerson:false,
              isAuxAccProject:false,
              isAuxAccSupplier:false,
              isEndNode:true,
              isMultiCalc:false,
              isQuantityCalc:false,
              orgId:1783310746191872,
              periodBeginAmount:"110.00",
              rowStatus:false,
              ts:"2017-01-13 15:24:35",
              yearBeginAmount:"110.00",
              yearBeginOrigAmount:"",
              yearBeginQuantity:"200",
              periodBeginQuantity:"200"
        }, {
              accIsAuxAccCalc:true	,
              accStatus:true	,
              accountCode:"3001_05_001"	,
              accountId:50044	,
              accountName:"实收资本"	,
              accountTypeId:91	,
              currentYear:2016	,
              departmentCode:"05"	,
              departmentId:1783310901381122	,
              departmentName:"销售部"	,
              direction:1	,
              directionName:"贷"	,
              id:1807105528694784	,
              inventoryCode:"001"	,
              inventoryId:1783346192844800	,
              inventoryName:"电流表"	,
              isAuxAccBankAccount:false	,
              isAuxAccCalc:true	,
              isAuxAccCustomer:false	,
              isAuxAccDepartment:true	,
              isAuxAccInventory:true	,
              isAuxAccPerson:false	,
              isAuxAccProject:false	,
              isAuxAccSupplier:false	,
              isEndNode:true	,
              isMultiCalc:false	,
              isQuantityCalc:false	,
              orgId:1783310746191872	,
              periodBeginAmount:"100.00"	,
              rowStatus:false	,
              ts:"2017-01-13 15:24:35",
              yearBeginAmount:"100.00",
              yearBeginOrigAmount:"",
              yearBeginQuantity:"200",
              periodBeginQuantity:"200"
        }]
        let curEditField = 'periodBeginQuantity'
        let tryCacuBalance = {
            "direction":0,
            "periodBeginAmountDrN":3433020,
            "periodBeginAmountCrN":157,
            "yearBeginAmountDrN":3439605,
            "yearBeginAmountCrN":50,
            "periodBeginAmountDr":"3,433,020.00",
            "periodBeginAmountCr":"157.00",
            "yearBeginAmountDr":"3,439,605.00",
            "yearBeginAmountCr":"50.00"
        }

        //期初余额数量的更新
        const nextNextState = reducer.updateBeginBalanceRows(state, relatedRows, curEditField, Map(tryCacuBalance))

        //当前编辑科目期初余额、年初余额更新
        expect(nextNextState.getIn(['data_runtime','list']).get(1).get(curEditField)).to.be.equal('200')
        expect(nextNextState.getIn(['data_runtime','list']).get(1).get('yearBeginQuantity')).to.be.equal('200')

        //当前编辑科目的上级科目期初余额、年初余额更新
        expect(nextNextState.getIn(['data_runtime','list']).get(0).get(curEditField)).to.be.equal('200')
        expect(nextNextState.getIn(['data_runtime','list']).get(0).get('yearBeginQuantity')).to.be.equal('200')
    })

    it('期初余额的外币更新测试', () => {
        let subjects = [
            {
              accIsAuxAccCalc:true,
              accStatus:true,
              accountCode:"3001",
              accountCodeCombine:"3001",
              accountGrade:1,
              accountId:50044,
              accountName:"实收资本",
              accountTypeId:91,
              amountCr:"",
              amountDr:"",
              currentYear:2016,
              direction:1,
              directionName:"贷",
              id:1807105529022465,
              isAuxAccBankAccount:false,
              isAuxAccCalc:false,
              isAuxAccCustomer:false,
              isAuxAccDepartment:true,
              isAuxAccInventory:true,
              isAuxAccPerson:false,
              isAuxAccProject:false,
              isAuxAccSupplier:false,
              isEndNode:true,
              isMultiCalc:false,
              isQuantityCalc:false,
              orgId:1783310746191872,
              origAmountCr:"",
              origAmountDr:"",
              periodBeginAmount:"10",
              periodBeginOrigAmount:"",
              periodBeginQuantity:"",
              quantityCr:"",
              quantityDr:"",
              rowStatus:false,
              ts:"2017-01-13 15:20:49",
              yearBeginAmount:"10",
              yearBeginOrigAmount:"",
              yearBeginQuantity:""
            },
            {
              "periodBeginAmount":"",
              "periodBeginOrigAmount":"300.30",
              "accountTypeId":91,
              "isMultiCalc":false,
              "yearBeginAmount":"",
              "yearBeginOrigAmount":"300.30",
              "isAuxAccCustomer":false,
              "accountCodeCombine":"",
              "amountDr":"",
              "origAmountDr":"",
              "inventoryName":"电流表",
              "amountCr":"",
              "accountId":50044,
              "origAmountCr":"",
              "inventoryCode":"001",
              "isAuxAccBankAccount":false,
              "directionName":"贷",
              "isQuantityCalc":false,
              "rowStatus":false,
              "departmentId":1783310901381122,
              "isAuxAccProject":false,
              "periodBeginQuantity":"",
              "isEndNode":true,
              "accStatus":true,
              "isAuxAccSupplier":false,
              "isAuxAccInventory":true,
              "currentYear":2016,
              "yearBeginQuantity":"",
              "inventoryId":1783346192844800,
              "accountName":"销售部_电流表",
              "quantityDr":"",
              "isAuxAccDepartment":true,
              "accountCode":"3001_05_001",
              "quantityCr":"",
              "id":1807105528694784,
              "isAuxAccPerson":false,
              "isAuxAccCalc":true,
              "departmentName":"销售部",
              "accIsAuxAccCalc":true,
              "departmentCode":"05",
              "ts":"2017-01-13 15:20:49",
              "orgId":1783310746191872,
              "direction":1
          },{
              "periodBeginAmount":"10",
              "periodBeginOrigAmount":"20.23",
              "accountTypeId":91,
              "isMultiCalc":false,
              "yearBeginAmount":"10",
              "yearBeginOrigAmount":"20.23",
              "isAuxAccCustomer":false,
              "accountCodeCombine":"",
              "amountDr":"",
              "origAmountDr":"",
              "inventoryName":"配电盘",
              "amountCr":"",
              "accountId":50044,
              "origAmountCr":"",
              "inventoryCode":"002",
              "isAuxAccBankAccount":false,
              "directionName":"贷",
              "isQuantityCalc":false,
              "rowStatus":false,
              "departmentId":1783310901381122,
              "isAuxAccProject":false,
              "periodBeginQuantity":"20",
              "isEndNode":true,
              "accStatus":true,
              "isAuxAccSupplier":false,
              "isAuxAccInventory":true,
              "currentYear":2016,
              "yearBeginQuantity":"",
              "inventoryId":1783347573753856,
              "accountName":"销售部_配电盘",
              "quantityDr":"",
              "isAuxAccDepartment":true,
              "accountCode":"3001_05_002",
              "quantityCr":"",
              "id":1807105529022464,
              "isAuxAccPerson":false,
              "isAuxAccCalc":true,
              "departmentName":"销售部",
              "accIsAuxAccCalc":true,
              "departmentCode":"05",
              "ts":"2017-01-13 14:40:02",
              "orgId":1783310746191872,
              "direction":1
          }]

        let state = Map(),
            meta = api.getMeta(),
            data = api.getData()

        data.list = subjects
        state = state
            .set('meta', fromJS(meta))
            .set('meta_runtime', fromJS(meta))
            .set('data', fromJS(data))
            .set('data_runtime', fromJS(data))
            .set('parsedMeta', util.parseMeta(fromJS(meta)))

        //设置期初余额外币金额为300.30
        let relatedRows = [
          {
              accIsAuxAccCalc:true	,
              accStatus:true,
              accountCode:"3001",
              accountGrade:1,
              accountId:50044,
              accountName:"实收资本",
              accountTypeId:91,
              currentYear:2016,
              direction:1,
              directionName:"贷",
              id:1807105529022465,
              isAuxAccBankAccount:false,
              isAuxAccCalc:false,
              isAuxAccCustomer:false,
              isAuxAccDepartment:true,
              isAuxAccInventory:true,
              isAuxAccPerson:false,
              isAuxAccProject:false,
              isAuxAccSupplier:false,
              isEndNode:true,
              isMultiCalc:false,
              isQuantityCalc:false,
              orgId:1783310746191872,
              periodBeginAmount:"110.00",
              rowStatus:false,
              ts:"2017-01-13 15:24:35",
              yearBeginAmount:"110.00",
              yearBeginOrigAmount:"320.53",
              yearBeginQuantity:"200",
              periodBeginQuantity:"200",
              periodBeginOrigAmount:"320.53"
        },  {
              accIsAuxAccCalc:true	,
              accStatus:true	,
              accountCode:"3001_05_001"	,
              accountId:50044	,
              accountName:"实收资本"	,
              accountTypeId:91	,
              currentYear:2016	,
              departmentCode:"05"	,
              departmentId:1783310901381122	,
              departmentName:"销售部"	,
              direction:1	,
              directionName:"贷"	,
              id:1807105528694784	,
              inventoryCode:"001"	,
              inventoryId:1783346192844800	,
              inventoryName:"电流表"	,
              isAuxAccBankAccount:false	,
              isAuxAccCalc:true	,
              isAuxAccCustomer:false	,
              isAuxAccDepartment:true	,
              isAuxAccInventory:true	,
              isAuxAccPerson:false	,
              isAuxAccProject:false	,
              isAuxAccSupplier:false	,
              isEndNode:true	,
              isMultiCalc:false	,
              isQuantityCalc:false	,
              orgId:1783310746191872	,
              periodBeginAmount:"100.00"	,
              rowStatus:false	,
              ts:"2017-01-13 15:24:35",
              yearBeginAmount:"100.00",
              yearBeginOrigAmount:"300.30",
              yearBeginQuantity:"200",
              periodBeginQuantity:"200",
              periodBeginOrigAmount: "300.30",
        }]
        let curEditField = 'periodBeginOrigAmount'
        let tryCacuBalance = {
            "direction":0,
            "periodBeginAmountDrN":3433020,
            "periodBeginAmountCrN":157,
            "yearBeginAmountDrN":3439605,
            "yearBeginAmountCrN":50,
            "periodBeginAmountDr":"3,433,020.00",
            "periodBeginAmountCr":"157.00",
            "yearBeginAmountDr":"3,439,605.00",
            "yearBeginAmountCr":"50.00"
        }

        //期初余额数量的更新
        const nextNextState = reducer.updateBeginBalanceRows(state, relatedRows, curEditField, Map(tryCacuBalance))

        //当前编辑科目期初余额、年初余额更新
        expect(nextNextState.getIn(['data_runtime','list']).get(1).get(curEditField)).to.be.equal('300.30')
        expect(nextNextState.getIn(['data_runtime','list']).get(1).get('yearBeginOrigAmount')).to.be.equal('300.30')

        debugger
        //当前编辑科目的上级科目期初余额、年初余额更新
        expect(nextNextState.getIn(['data_runtime','list']).get(0).get(curEditField)).to.be.equal('320.53')
        //expect(nextNextState.getIn(['data_runtime','list']).get(0).get('yearBeginOrigAmount')).to.be.equal('320.53')
    })

    it('本年借方累计金额更新测试', () => {
        let subjects = [
            {
              accIsAuxAccCalc:true,
              accStatus:true,
              accountCode:"3001",
              accountCodeCombine:"3001",
              accountGrade:1,
              accountId:50044,
              accountName:"实收资本",
              accountTypeId:91,
              amountCr:"",
              amountDr:"260.10",
              currentYear:2016,
              direction:1,
              directionName:"贷",
              id:1807105529022465,
              isAuxAccBankAccount:false,
              isAuxAccCalc:false,
              isAuxAccCustomer:false,
              isAuxAccDepartment:true,
              isAuxAccInventory:true,
              isAuxAccPerson:false,
              isAuxAccProject:false,
              isAuxAccSupplier:false,
              isEndNode:true,
              isMultiCalc:false,
              isQuantityCalc:false,
              orgId:1783310746191872,
              origAmountCr:"",
              origAmountDr:"",
              periodBeginAmount:"10",
              periodBeginOrigAmount:"",
              periodBeginQuantity:"",
              quantityCr:"",
              quantityDr:"",
              rowStatus:false,
              ts:"2017-01-13 15:20:49",
              yearBeginAmount:"10",
              yearBeginOrigAmount:"",
              yearBeginQuantity:""
            },
            {
              "periodBeginAmount":"",
              "periodBeginOrigAmount":"",
              "accountTypeId":91,
              "isMultiCalc":false,
              "yearBeginAmount":"",
              "yearBeginOrigAmount":"",
              "isAuxAccCustomer":false,
              "accountCodeCombine":"",
              "amountDr":"",
              "origAmountDr":"",
              "inventoryName":"电流表",
              "amountCr":"",
              "accountId":50044,
              "origAmountCr":"",
              "inventoryCode":"001",
              "isAuxAccBankAccount":false,
              "directionName":"贷",
              "isQuantityCalc":false,
              "rowStatus":false,
              "departmentId":1783310901381122,
              "isAuxAccProject":false,
              "periodBeginQuantity":"",
              "isEndNode":true,
              "accStatus":true,
              "isAuxAccSupplier":false,
              "isAuxAccInventory":true,
              "currentYear":2016,
              "yearBeginQuantity":"",
              "inventoryId":1783346192844800,
              "accountName":"销售部_电流表",
              "quantityDr":"",
              "isAuxAccDepartment":true,
              "accountCode":"3001_05_001",
              "quantityCr":"",
              "id":1807105528694784,
              "isAuxAccPerson":false,
              "isAuxAccCalc":true,
              "departmentName":"销售部",
              "accIsAuxAccCalc":true,
              "departmentCode":"05",
              "ts":"2017-01-13 15:20:49",
              "orgId":1783310746191872,
              "direction":1
          },{
              "periodBeginAmount":"10",
              "periodBeginOrigAmount":"",
              "accountTypeId":91,
              "isMultiCalc":false,
              "yearBeginAmount":"10",
              "yearBeginOrigAmount":"",
              "isAuxAccCustomer":false,
              "accountCodeCombine":"",
              "amountDr":"",
              "origAmountDr":"",
              "inventoryName":"配电盘",
              "amountCr":"",
              "accountId":50044,
              "origAmountCr":"",
              "inventoryCode":"002",
              "isAuxAccBankAccount":false,
              "directionName":"贷",
              "isQuantityCalc":false,
              "rowStatus":false,
              "departmentId":1783310901381122,
              "isAuxAccProject":false,
              "periodBeginQuantity":"20",
              "isEndNode":true,
              "accStatus":true,
              "isAuxAccSupplier":false,
              "isAuxAccInventory":true,
              "currentYear":2016,
              "yearBeginQuantity":"",
              "inventoryId":1783347573753856,
              "accountName":"销售部_配电盘",
              "quantityDr":"",
              "isAuxAccDepartment":true,
              "accountCode":"3001_05_002",
              "quantityCr":"",
              "id":1807105529022464,
              "isAuxAccPerson":false,
              "isAuxAccCalc":true,
              "departmentName":"销售部",
              "accIsAuxAccCalc":true,
              "departmentCode":"05",
              "ts":"2017-01-13 14:40:02",
              "orgId":1783310746191872,
              "direction":1
          }]

        let state = Map(),
            meta = api.getMeta(),
            data = api.getData()

        data.list = subjects
        state = state
            .set('meta', fromJS(meta))
            .set('meta_runtime', fromJS(meta))
            .set('data', fromJS(data))
            .set('data_runtime', fromJS(data))
            .set('parsedMeta', util.parseMeta(fromJS(meta)))

        let relatedRows = [
          {
              accIsAuxAccCalc:true	,
              accStatus:true,
              accountCode:"3001",
              accountGrade:1,
              accountId:50044,
              accountName:"实收资本",
              accountTypeId:91,
              currentYear:2016,
              direction:1,
              directionName:"贷",
              id:1807105529022465,
              isAuxAccBankAccount:false,
              isAuxAccCalc:false,
              isAuxAccCustomer:false,
              isAuxAccDepartment:true,
              isAuxAccInventory:true,
              isAuxAccPerson:false,
              isAuxAccProject:false,
              isAuxAccSupplier:false,
              isEndNode:true,
              isMultiCalc:false,
              isQuantityCalc:false,
              orgId:1783310746191872,
              periodBeginAmount:"110.00",
              rowStatus:false,
              ts:"2017-01-13 15:24:35",
              yearBeginAmount:"110.00",
              yearBeginOrigAmount:"",
              yearBeginQuantity:""
        }, {
              accIsAuxAccCalc:true	,
              accStatus:true	,
              accountCode:"3001_05_001"	,
              accountId:50044	,
              accountName:"实收资本"	,
              accountTypeId:91	,
              currentYear:2016	,
              departmentCode:"05"	,
              departmentId:1783310901381122	,
              departmentName:"销售部"	,
              direction:1	,
              directionName:"贷"	,
              id:1807105528694784	,
              inventoryCode:"001"	,
              inventoryId:1783346192844800	,
              inventoryName:"电流表"	,
              isAuxAccBankAccount:false	,
              isAuxAccCalc:true	,
              isAuxAccCustomer:false	,
              isAuxAccDepartment:true	,
              isAuxAccInventory:true	,
              isAuxAccPerson:false	,
              isAuxAccProject:false	,
              isAuxAccSupplier:false	,
              isEndNode:true	,
              isMultiCalc:false	,
              isQuantityCalc:false	,
              orgId:1783310746191872	,
              periodBeginAmount:"100.00"	,
              rowStatus:false	,
              ts:"2017-01-13 15:24:35",
              yearBeginAmount:"100.00",
              yearBeginOrigAmount:"",
              yearBeginQuantity:""
        }]

        let curEditField = 'periodBeginAmount'
        let tryCacuBalance = {
            "direction":0,
            "periodBeginAmountDrN":3433020,
            "periodBeginAmountCrN":157,
            "yearBeginAmountDrN":3439605,
            "yearBeginAmountCrN":50,
            "periodBeginAmountDr":"3,433,020.00",
            "periodBeginAmountCr":"157.00",
            "yearBeginAmountDr":"3,439,605.00",
            "yearBeginAmountCr":"50.00"
        }

        //期初余额的更新
        const nextState = reducer.updateBeginBalanceRows(state, relatedRows, curEditField, Map(tryCacuBalance))

        //当前编辑科目期初余额、年初余额更新
        expect(nextState.getIn(['data_runtime','list']).get(1).get(curEditField)).to.be.equal('100.00')
        expect(nextState.getIn(['data_runtime','list']).get(1).get('yearBeginAmount')).to.be.equal('100.00')

        //当前编辑科目的上级科目期初余额、年初余额更新
        expect(nextState.getIn(['data_runtime','list']).get(0).get(curEditField)).to.be.equal('110.00')
        expect(nextState.getIn(['data_runtime','list']).get(0).get('yearBeginAmount')).to.be.equal('110.00')
    })

})

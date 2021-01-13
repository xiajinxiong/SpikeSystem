<template>
<div style="position: relative;width: 100%;background: #344b58 !important" >
    <div >
        <el-table
      :data="list"
      border
      fit
      @click="handleTableClick();"
      highlight-current-row
       :header-cell-style="{background:'#344b58',color:'#fff'}"
       :row-style="{background:'#344b58',color:'#fff'}"
       style="background: #344b58;"
    >
    <el-table-column prop="name" label="cookie" min-width="130" align="center">
    </el-table-column>
    <el-table-column prop="annual_return" label="年化收益率" min-width="100" align="center">
    </el-table-column>
    <el-table-column prop="MDD" label="最大回撤率" min-width="100" align="center">
    </el-table-column >
    <el-table-column prop="volatility" label="波动率" min-width="100" align="center">
    </el-table-column>
    <el-table-column prop="sharpe" label="夏普比率" min-width="100" align="center">
    </el-table-column>
    <el-table-column prop="sortino" label="索定能比率" min-width="100" align="center">
    </el-table-column>
    <el-table-column prop="calmar" label="Calmar比率" min-width="100" align="center">
    </el-table-column>    
    <!--<el-table-column label="操作">
      <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
    </el-table-column>-->
    </el-table>
    </div>
    <div :zIndex="1" style="height: 30px;position: relative;z-index: 99;left:5%;padding-top:1%;">
      <el-button type="text" @click="handleClick()">对数</el-button>
      <el-button type="text" @click="dialogFormVisible = true">选择对比策略</el-button>

    <el-dialog title="请选择账户" :visible.sync="dialogFormVisible">
      <el-select
    v-model="dialog_selected_accounts"
    multiple
    collapse-tags
    style="margin-left: 20px;"
    placeholder="请选择">
    <el-option
      v-for="item in all_assets_data"
      :key="item.cookie"
      :label="item.cookie"
      :value="item.cookie">
    </el-option>
  </el-select>
  <div slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">取 消</el-button>
    <el-button type="primary" @click="handleSelect()">确 定</el-button>
  </div>
</el-dialog>

     <!--<el-switch
      v-model="value1"
      inactive-text="">
    </el-switch>
    &nbsp;
     <span v-bind:class="{switchActive: value1, switchInactive: !value1}">对数</span>-->
    </div>
    
    <!--<div :zIndex="-1" :id="id" :class="className" :style="{height:height,width:width} "></div>-->
    <div :zIndex="-1" :id="id" :class="className" style="top:-30px;position: relative;width: 100%;height: calc(100vh - 204px);z-index:0;"></div>
    <!--<strategy-comparison-bar-chart :cookie="this.$route.params.id"></strategy-comparison-bar-chart>-->
</div>

</template>

<script>
import echarts from 'echarts'
import { annualReturn, annual_return, calcAnnualReturn, maxDrawDown, volatility, Sharpe, sortino, calmar } from '@/api/risk'
import strategyComparisonBarChart from '@/components/Strategy/strategyComparisonBarChart'
import axios from 'axios'

export default {
  components: {
    strategyComparisonBarChart: strategyComparisonBarChart
  },
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    id: {
      type: String,
      default: 'chart'
    },
    id2: {
      type: String,
      default: 'chart2'
    },
    width: {
      type: String,
      default: '200px'
    },
    height: {
      type: String,
      default: '200px'
    },
    marginTop: {
        type: String,
        default: '200px'
    }
  },
  data() {
    return {
      dialog_selected_accounts: [],
      selected_accounts: [],
      dialogFormVisible: false,
        formLabelWidth: '120px',
      chart: null,
      xRe: [], //['2020-05-07', '2020-05-08', '2020-05-11', '2020-05-12', '2020-05-13', '2020-05-14', '2020-05-15', '2020-05-18', '2020-05-19', '2020-05-20', '2020-05-21', '2020-05-22', '2020-05-25', '2020-05-26', '2020-05-27', '2020-05-28', '2020-05-29', '2020-06-01', '2020-06-02', '2020-06-03', '2020-06-04', '2020-06-05', '2020-06-08', '2020-06-09', '2020-06-10', '2020-06-11', '2020-06-12', '2020-06-15', '2020-06-16', '2020-06-17', '2020-06-18', '2020-06-19', '2020-06-22', '2020-06-23', '2020-06-24', '2020-06-29', '2020-06-30', '2020-07-01', '2020-07-02', '2020-07-03', '2020-07-06', '2020-07-07', '2020-07-08', '2020-07-09', '2020-07-10', '2020-07-13', '2020-07-14', '2020-07-15', '2020-07-16', '2020-07-17', '2020-07-20', '2020-07-21', '2020-07-22', '2020-07-23', '2020-07-24', '2020-07-27', '2020-07-28', '2020-07-29', '2020-07-30', '2020-07-31', '2020-08-03', '2020-08-04', '2020-08-05', '2020-08-06', '2020-08-07', '2020-08-10', '2020-08-11', '2020-08-12', '2020-08-13', '2020-08-14', '2020-08-17', '2020-08-18', '2020-08-19', '2020-08-20', '2020-08-21', '2020-08-24', '2020-08-25', '2020-08-26', '2020-08-27', '2020-08-28', '2020-08-31', '2020-09-01', '2020-09-02', '2020-09-03', '2020-09-04', '2020-09-07', '2020-09-08', '2020-09-09', '2020-09-10', '2020-09-11', '2020-09-14', '2020-09-15', '2020-09-16', '2020-09-17', '2020-09-18', '2020-09-21', '2020-09-22', '2020-09-23', '2020-09-24', '2020-09-25', '2020-09-28', '2020-09-29', '2020-09-30', '2020-10-09', '2020-10-12', '2020-10-13', '2020-10-14', '2020-10-15', '2020-10-16'],
      real_strategy_data: [[]],//[1.0, 1.014921772285378, 1.0135929034820714, 1.0169418936478978, 1.0240150241114814, 1.014932476947561, 1.0200792275461252, 1.0175337698858848, 1.03527216801265, 1.026154830199575, 1.0166919677448671, 0.9986755434665109, 0.9990840281853316, 1.0280536844373875, 1.0200072725921154, 1.0169758476216457, 1.033948420525008, 1.0640056593841674, 1.061306852213823, 1.0675366674356257, 1.0752984643457528, 1.077014313552694, 1.0729923933508614, 1.0849119480502851, 1.0901944493243525, 1.0908160975071794, 1.0934441683555196, 1.0902171351603245, 1.1160154696666411, 1.1189512060800193, 1.1175606574545953, 1.1363413924300148, 1.1399356810053654, 1.1542781544769243, 1.1513742137353762, 1.1530165817563038, 1.1768757519053306, 1.1747200130045083, 1.179319476124852, 1.1939336064934323, 1.2192303235759299, 1.2481016643990046, 1.2707409657263589, 1.3110006815063662, 1.3271767820099023, 1.3722596688967414, 1.3647171567565288, 1.3390038832072213, 1.2610684520658455, 1.2728213592319346, 1.3099603333212804, 1.3277638637728342, 1.3420714130053137, 1.3413745245357636, 1.276210237085672, 1.2818992507087796, 1.2990524135469952, 1.3353733920011166, 1.3338241761860041, 1.3526936140174282, 1.3850133464748704, 1.382876822520146, 1.412232883474331, 1.409867845096792, 1.4096418301968248, 1.417433215521484, 1.3866723720782386, 1.3553017593122556, 1.3598181146948738, 1.3744542654871759, 1.4006279570954319, 1.4139714700028747, 1.3870140180815183, 1.3700312984966727, 1.3928256165499184, 1.41109645014756, 1.4124768956149254, 1.379976330021213, 1.4080624279361915, 1.427487460288597, 1.4322933627027532, 1.4467379572843844, 1.4491044520516305, 1.4387137772070795, 1.4378577690301362, 1.4045716392534588, 1.410477850976207, 1.353013548310812, 1.3046672355043434, 1.3412983823330502, 1.3932521825916706, 1.3976826162128453, 1.3805024995341477, 1.390066816746419, 1.4023691982463957, 1.3957293323934272, 1.372036007362, 1.3873464450392181, 1.3484513220577519, 1.3406958449253652, 1.3162258412161962, 1.334759462089572, 1.331912808918939, 1.3729815140249952, 1.4138568246329994, 1.424881533838964, 1.4181034663271674, 1.4159019376141293, 1.4189782261064257],
      map: new Map(),
      real_strategy_reference_value: [],
      real_strategy_relative_data: [[]],//[1.0, 1.014921772285378, 1.0135929034820714, 1.0169418936478978, 1.0240150241114814, 1.014932476947561, 1.0200792275461252, 1.0175337698858848, 1.03527216801265, 1.026154830199575, 1.0166919677448671, 0.9986755434665109, 0.9990840281853316, 1.0280536844373875, 1.0200072725921154, 1.0169758476216457, 1.033948420525008, 1.0640056593841674, 1.061306852213823, 1.0675366674356257, 1.0752984643457528, 1.077014313552694, 1.0729923933508614, 1.0849119480502851, 1.0901944493243525, 1.0908160975071794, 1.0934441683555196, 1.0902171351603245, 1.1160154696666411, 1.1189512060800193, 1.1175606574545953, 1.1363413924300148, 1.1399356810053654, 1.1542781544769243, 1.1513742137353762, 1.1530165817563038, 1.1768757519053306, 1.1747200130045083, 1.179319476124852, 1.1939336064934323, 1.2192303235759299, 1.2481016643990046, 1.2707409657263589, 1.3110006815063662, 1.3271767820099023, 1.3722596688967414, 1.3647171567565288, 1.3390038832072213, 1.2610684520658455, 1.2728213592319346, 1.3099603333212804, 1.3277638637728342, 1.3420714130053137, 1.3413745245357636, 1.276210237085672, 1.2818992507087796, 1.2990524135469952, 1.3353733920011166, 1.3338241761860041, 1.3526936140174282, 1.3850133464748704, 1.382876822520146, 1.412232883474331, 1.409867845096792, 1.4096418301968248, 1.417433215521484, 1.3866723720782386, 1.3553017593122556, 1.3598181146948738, 1.3744542654871759, 1.4006279570954319, 1.4139714700028747, 1.3870140180815183, 1.3700312984966727, 1.3928256165499184, 1.41109645014756, 1.4124768956149254, 1.379976330021213, 1.4080624279361915, 1.427487460288597, 1.4322933627027532, 1.4467379572843844, 1.4491044520516305, 1.4387137772070795, 1.4378577690301362, 1.4045716392534588, 1.410477850976207, 1.353013548310812, 1.3046672355043434, 1.3412983823330502, 1.3932521825916706, 1.3976826162128453, 1.3805024995341477, 1.390066816746419, 1.4023691982463957, 1.3957293323934272, 1.372036007362, 1.3873464450392181, 1.3484513220577519, 1.3406958449253652, 1.3162258412161962, 1.334759462089572, 1.331912808918939, 1.3729815140249952, 1.4138568246329994, 1.424881533838964, 1.4181034663271674, 1.4159019376141293, 1.4189782261064257],
      log_strategy_data: [[]],
      log_strategy_assets_data: [[]],
      starttime: 0,
      endtime: 0,
      benchmark_assets: [],//[1.0, 1.0113748479801292, 1.0092622838730496, 1.0122503010098571, 1.0166236548528773, 1.0075940110308734, 1.0114183865041666, 1.0060726049602076, 1.0187529659586585, 1.0080706027022641, 0.9964050143378731, 0.978418939724375, 0.976284578810871, 0.99531023438655, 0.9859977646062061, 0.9844677279550689, 0.9927628726530857, 1.0227201132684725, 1.022162577770023, 1.0232402434639007, 1.024055741503758, 1.0256477347049175, 1.0237894972776853, 1.030230077135905, 1.0311233054888158, 1.0263232704376415, 1.0267612632150944, 1.026606353477102, 1.0458244893602295, 1.053191259043586, 1.0530048201424673, 1.0626903880802943, 1.0621172257223104, 1.0658478584013351, 1.0630468310537615, 1.0581528328530723, 1.076879099101081, 1.0800873062175307, 1.0972368021392969, 1.1112349609610381, 1.1568384340094526, 1.1715604598145575, 1.2000941688144113, 1.2291682256035203, 1.2259899868005373, 1.266954063772167, 1.2500986319262912, 1.2190857244157598, 1.1605372804442302, 1.1650532959461486, 1.1985181513685925, 1.2052190442241777, 1.2157530165852766, 1.2156422146223738, 1.1539238686213378, 1.1566327691131137, 1.1678210496515642, 1.199149597689164, 1.1956909017467359, 1.2082205948456817, 1.2376268004423778, 1.2298957468113814, 1.2436927580193287, 1.243226229237509, 1.2282752359687925, 1.2349618057333829, 1.2121094242284522, 1.1988059720458437, 1.2032602329900488, 1.2162807673996312, 1.238496891494451, 1.2467328708088963, 1.2241237064068233, 1.2108125968794134, 1.2200233359878183, 1.2282903853919604, 1.2216031729245689, 1.1983429873108982, 1.2080592948055526, 1.2287026149685591, 1.2245201805833277, 1.232237535463193, 1.2335409367437395, 1.2233850572590352, 1.2153649893598715, 1.1897002505751317, 1.198199646223325, 1.1659039039218808, 1.1450335627666033, 1.1590625345969212, 1.1662746148975316, 1.1730024829078238, 1.166750912761927, 1.169171992576452, 1.1879845646291747, 1.1836684847871972, 1.1676352718161838, 1.173764985511, 1.146699117894078, 1.1452762657072206, 1.1345484358183853, 1.1437852686605132, 1.1371257107765045, 1.1675102385769722, 1.2011520392620163, 1.2030292272404106, 1.195128683699307, 1.1862532334607456, 1.1804948734443814],
      relative_benchmark_assets: [], //[1.0, 1.0113748479801292, 1.0092622838730496, 1.0122503010098571, 1.0166236548528773, 1.0075940110308734, 1.0114183865041666, 1.0060726049602076, 1.0187529659586585, 1.0080706027022641, 0.9964050143378731, 0.978418939724375, 0.976284578810871, 0.99531023438655, 0.9859977646062061, 0.9844677279550689, 0.9927628726530857, 1.0227201132684725, 1.022162577770023, 1.0232402434639007, 1.024055741503758, 1.0256477347049175, 1.0237894972776853, 1.030230077135905, 1.0311233054888158, 1.0263232704376415, 1.0267612632150944, 1.026606353477102, 1.0458244893602295, 1.053191259043586, 1.0530048201424673, 1.0626903880802943, 1.0621172257223104, 1.0658478584013351, 1.0630468310537615, 1.0581528328530723, 1.076879099101081, 1.0800873062175307, 1.0972368021392969, 1.1112349609610381, 1.1568384340094526, 1.1715604598145575, 1.2000941688144113, 1.2291682256035203, 1.2259899868005373, 1.266954063772167, 1.2500986319262912, 1.2190857244157598, 1.1605372804442302, 1.1650532959461486, 1.1985181513685925, 1.2052190442241777, 1.2157530165852766, 1.2156422146223738, 1.1539238686213378, 1.1566327691131137, 1.1678210496515642, 1.199149597689164, 1.1956909017467359, 1.2082205948456817, 1.2376268004423778, 1.2298957468113814, 1.2436927580193287, 1.243226229237509, 1.2282752359687925, 1.2349618057333829, 1.2121094242284522, 1.1988059720458437, 1.2032602329900488, 1.2162807673996312, 1.238496891494451, 1.2467328708088963, 1.2241237064068233, 1.2108125968794134, 1.2200233359878183, 1.2282903853919604, 1.2216031729245689, 1.1983429873108982, 1.2080592948055526, 1.2287026149685591, 1.2245201805833277, 1.232237535463193, 1.2335409367437395, 1.2233850572590352, 1.2153649893598715, 1.1897002505751317, 1.198199646223325, 1.1659039039218808, 1.1450335627666033, 1.1590625345969212, 1.1662746148975316, 1.1730024829078238, 1.166750912761927, 1.169171992576452, 1.1879845646291747, 1.1836684847871972, 1.1676352718161838, 1.173764985511, 1.146699117894078, 1.1452762657072206, 1.1345484358183853, 1.1437852686605132, 1.1371257107765045, 1.1675102385769722, 1.2011520392620163, 1.2030292272404106, 1.195128683699307, 1.1862532334607456, 1.1804948734443814],
      log_benchmark_assets: [],
      benchmark_assets_reference_value: 1.0,
      alpha_assets: [], //[1.0, 1.0035070323454578, 1.004290876294716, 1.0046348147620803, 1.0072705068619259, 1.0072831575380043, 1.0085630646600106, 1.0113919858956208, 1.016215120452137, 1.0179394453611026, 1.0203601478465814, 1.0207034051771753, 1.0233532823003624, 1.0328977327064448, 1.0344924798074895, 1.033021010992511, 1.0414857857867479, 1.0403683721284722, 1.038295546418064, 1.0432903457957943, 1.0500389976494329, 1.05008208677276, 1.0480595827599417, 1.0530773388662837, 1.0572881473254387, 1.0628387067965799, 1.0649448976401985, 1.0619621936565788, 1.0671154491222041, 1.0624387512446227, 1.061306307509014, 1.0693061734403828, 1.0732672942293477, 1.0829670908268518, 1.0830888913840784, 1.0896503283438297, 1.0928578267399944, 1.0876157938735358, 1.0748085316000315, 1.0744204857097668, 1.0539331057235322, 1.0653326970394363, 1.0588677111744826, 1.0665754729078407, 1.0825347648013275, 1.0831171453928192, 1.0916875852056733, 1.0983672898384005, 1.08662468092635, 1.0925005436753576, 1.0929833076165192, 1.1016784626296217, 1.103901363761228, 1.1034287131534397, 1.1059743816638763, 1.1083027257577338, 1.1123728365185623, 1.1136003335817852, 1.1155259057650058, 1.1195750343836832, 1.1190880368620093, 1.124385401043448, 1.1355158855499123, 1.1340396558086514, 1.1476595708493469, 1.147754698923454, 1.1440158325317051, 1.130543049430544, 1.1301114068365623, 1.130046862802669, 1.1309095458490357, 1.1341414854053473, 1.1330668712828278, 1.1314973944172766, 1.1416385043341708, 1.148829679796984, 1.1562485485637672, 1.1515704140080154, 1.1655573811572146, 1.1617843430121815, 1.1696772216693465, 1.1740739229636936, 1.1747518131639216, 1.1760105852776093, 1.1830666356346589, 1.1806096859897717, 1.177164302645201, 1.1604846194952514, 1.1394139682264308, 1.1572269332297103, 1.1946176010305096, 1.1915427602063116, 1.1832024165862693, 1.1889327024360128, 1.1804607904852202, 1.1791556084593693, 1.1750552937886876, 1.1819627115859443, 1.1759417104411778, 1.170630951735886, 1.1601319076930914, 1.166966823810127, 1.1712977697157343, 1.1759909837694127, 1.17708398139312, 1.1844114021298162, 1.1865696854816354, 1.193591635980972, 1.2020198122218109],
      relative_alpha_assets: [], //[1.0, 1.0035070323454578, 1.004290876294716, 1.0046348147620803, 1.0072705068619259, 1.0072831575380043, 1.0085630646600106, 1.0113919858956208, 1.016215120452137, 1.0179394453611026, 1.0203601478465814, 1.0207034051771753, 1.0233532823003624, 1.0328977327064448, 1.0344924798074895, 1.033021010992511, 1.0414857857867479, 1.0403683721284722, 1.038295546418064, 1.0432903457957943, 1.0500389976494329, 1.05008208677276, 1.0480595827599417, 1.0530773388662837, 1.0572881473254387, 1.0628387067965799, 1.0649448976401985, 1.0619621936565788, 1.0671154491222041, 1.0624387512446227, 1.061306307509014, 1.0693061734403828, 1.0732672942293477, 1.0829670908268518, 1.0830888913840784, 1.0896503283438297, 1.0928578267399944, 1.0876157938735358, 1.0748085316000315, 1.0744204857097668, 1.0539331057235322, 1.0653326970394363, 1.0588677111744826, 1.0665754729078407, 1.0825347648013275, 1.0831171453928192, 1.0916875852056733, 1.0983672898384005, 1.08662468092635, 1.0925005436753576, 1.0929833076165192, 1.1016784626296217, 1.103901363761228, 1.1034287131534397, 1.1059743816638763, 1.1083027257577338, 1.1123728365185623, 1.1136003335817852, 1.1155259057650058, 1.1195750343836832, 1.1190880368620093, 1.124385401043448, 1.1355158855499123, 1.1340396558086514, 1.1476595708493469, 1.147754698923454, 1.1440158325317051, 1.130543049430544, 1.1301114068365623, 1.130046862802669, 1.1309095458490357, 1.1341414854053473, 1.1330668712828278, 1.1314973944172766, 1.1416385043341708, 1.148829679796984, 1.1562485485637672, 1.1515704140080154, 1.1655573811572146, 1.1617843430121815, 1.1696772216693465, 1.1740739229636936, 1.1747518131639216, 1.1760105852776093, 1.1830666356346589, 1.1806096859897717, 1.177164302645201, 1.1604846194952514, 1.1394139682264308, 1.1572269332297103, 1.1946176010305096, 1.1915427602063116, 1.1832024165862693, 1.1889327024360128, 1.1804607904852202, 1.1791556084593693, 1.1750552937886876, 1.1819627115859443, 1.1759417104411778, 1.170630951735886, 1.1601319076930914, 1.166966823810127, 1.1712977697157343, 1.1759909837694127, 1.17708398139312, 1.1844114021298162, 1.1865696854816354, 1.193591635980972, 1.2020198122218109],
      log_alpha_assets: [],
      alpha_assets_reference_value: 1.0,
      //list: [{annual_return: 0.525, max_dropdown: 0.0369, volatility: 0.105, benchmark_code: '399905', 'bm_annual_return': 0.463,
      //beta: 0.06, alpha: 0.45, sharpe: 4.524, sortino: 8.298, calmar: 12.873}, 
      //{annual_return: 0.525, max_dropdown: 0.0369, volatility: 0.105, benchmark_code: '399905', 'bm_annual_return': 0.463,
      //beta: 0.06, alpha: 0.45, sharpe: 4.524, sortino: 8.298, calmar: 12.873}],
      radio: '1',
      value1: false,
      annual_return: [[[]]],
      alpha_annual_return: [[]],
      MDD: [[[]]],
      alphaMDD: [[]],
      volatility: [[[]]],
      alpha_volatility: [[]],
      Sharpe: [[[]]],
      alpha_Sharpe: [[]],
      sortino: [[[]]],
      alpha_sortino: [[]],
      calmar: [[[]]],
      alpha_calmar: [[]],
      startIndex: 0,
      endIndex: 0,
      all_assets_data: [],
      assets_data: [],
      assets_data_reference_value: [],
      colors: ["#00ffff",
    "#f0ffff",
    "#f5f5dc",
    "#0000ff",
    "#a52a2a",
    "#00ffff",
    "#ff00ff",
    "#ffd700",
    "#008000",
    "#4b0082",
    "#f0e68c",
    "#add8e6",
    "#e0ffff",
    "#90ee90",
    "#d3d3d3",
    "#ffb6c1",
    "#ffffe0",
    "#00ff00",
    "#ff00ff",
    "#800000",
    "#000080",
    "#808000",
    "#ffa500",
    "#ffc0cb",
    "#800080",
    "#800080",
    "#ff0000",
    "#c0c0c0",
    "#ffffff",
    "#ffff00"],
    };
  },
  watch: {
    starttime: function(val, oldVal) {
      //this.list[0].annual_return = calcAnnualReturn(this.real_strategy_data[this.map.get(this.starttime)], 
      //this.real_strategy_data[this.map.get(this.endtime)], this.map.get(this.endtime) - this.map.get(this.starttime) + 1);
    },
    endtime: function(val, oldVal) {
      //this.list[0].annual_return = calcAnnualReturn(this.real_strategy_data[this.map.get(this.starttime)], 
      //this.real_strategy_data[this.map.get(this.endtime)], this.map.get(this.endtime) - this.map.get(this.starttime) + 1);
    },
    assets_data_reference_value:{
      handler: function (val) {
        this.handle_assets_data_reference_value(val);  
      },
      deep: true,
    }, 
    real_strategy_reference_value: function (val, oldVal) {
      this.handle_real_strategy_reference_value(val, oldVal);  
    },
    benchmark_assets_reference_value: function (val, oldVal) {
      this.handle_benchmark_assets_reference_value(val, oldVal);
    },
    alpha_assets_reference_value: function (val, oldVal) {
      this.handle_alpha_assets_reference_value(val, oldVal);
    },
    value1: {
      handler: function (val, oldVal) {
      if (val == true) {
        let option = this.chart.getOption();
        let data0 = [...this.log_strategy_assets_data];
        for (let i = 0; i < data0.length; i++) { 
            for (let j = 0; j < data0[i].length; j++) {
                data0[i][j] -= this.log_strategy_assets_data[i][this.startIndex];
            }
        }
        for (let i = 0; i < data0.length; i++) {
            option.series[i].data = data0[i];
        }
        this.chart.clear();
        this.chart.setOption(option, true);
      }
      else {
        let option = this.chart.getOption();
        /*option.series[0].data = [...this.real_strategy_data];
        option.series[1].data = [...this.benchmark_assets];
        option.series[2].data = [...this.alpha_assets];
        for (let i = 0; i < option.series[0].data.length; i++) {
          option.series[0].data[i] /= this.real_strategy_reference_value;
        }
        for (let i = 0; i < option.series[1].data.length; i++) {
          option.series[1].data[i] /= this.benchmark_assets_reference_value;
        }
        for (let i = 0; i < option.series[2].data.length; i++) {
          option.series[2].data[i] /= this.alpha_assets_reference_value;
        }*/
        for (let i = 0; i < this.assets_data.length; i++) {
            option.series[i].data = [...this.assets_data[i]['assets']];
            for (let j = 0; j < option.series[i].data.length; j++ ) {
                option.series[i].data[j] /= this.assets_data_reference_value[i];
            }
        }
        this.chart.clear();
        this.chart.setOption(option, true);
      }
    },
    deep: true, 
    }
    },
  mounted() {
    let config = {
    url: 'http://localhost:5000/'
}
    axios.get(config.url + 'assets_all').then(response => {
        this.assets_data = response.data['data']
        this.all_assets_data = [...this.assets_data]
        for (let i = 0; i < this.assets_data.length; i++) {
          this.assets_data_reference_value.push(this.assets_data[i]['assets'][0])
        }
         //this.assets_data = response.data['data'][0]['assets']
        //this.real_strategy_relative_data = this.real_strategy_data = [...response.data['assets']]
        //this.benchmark_assets = this.relative_benchmark_assets = [...response.data['assets_bm']]
        //this.alpha_assets = this.relative_alpha_assets = [...response.data['assets_alpha']]
        this.xRe = [...this.assets_data[0]['time_index']]
        this.initChart();    
        this.log_strategy_assets_data = [];
        for (var i = 0; i < this.assets_data.length; i++) {
            let temp = [];
            for (var j = 0; j < this.assets_data[i]['assets'].length; j++) {
                temp.push(Math.log(this.assets_data[i]['assets'][j]))
            }
            this.log_strategy_assets_data.push(temp);
        }
    /*this.real_strategy_data.forEach(e => {
      this.log_strategy_data.push(Math.log(e));
    })
    this.benchmark_assets.forEach(e => {
      this.log_benchmark_assets.push(Math.log(e));
    })
    this.alpha_assets.forEach(e => {
      this.log_alpha_assets.push(Math.log(e));
    })*/
    this.starttime = 0;
    this.endtime = this.xRe[this.xRe.length - 1]
    /*this.annual_return = annualReturn(this.real_strategy_data);
    this.alpha_annual_return = annualReturn(this.relative_alpha_assets);
    this.volatility = volatility(this.real_strategy_data);
    this.alpha_volatility = volatility(this.alpha_assets);
    this.Sharpe = Sharpe(this.annual_return, this.volatility);
    this.alpha_Sharpe = Sharpe(this.alpha_annual_return, this.alpha_volatility);
    this.MDD = maxDrawDown(this.real_strategy_data);
    this.alphaMDD = maxDrawDown(this.relative_alpha_assets);
    this.sortino = sortino(this.real_strategy_data, this.annual_return);
    this.alpha_sortino = sortino(this.alpha_assets, this.alpha_annual_return);
    this.calmar = calmar(this.annual_return, this.MDD);
    this.alpha_calmar = calmar(this.alpha_annual_return, this.alphaMDD);
    this.getLogValue();*/
    for (var i = 0; i < this.assets_data.length; i++) {
      this.annual_return[i] = annualReturn(this.assets_data[i]['assets']);
      this.alpha_annual_return[i] = annualReturn(this.assets_data[i]['assets_alpha'])
      this.volatility[i] = volatility(this.assets_data[i]['assets'])
      this.Sharpe[i] = Sharpe(this.annual_return[i], this.volatility[i])
      this.MDD [i] = maxDrawDown(this.assets_data[i]['assets'])
      this.sortino[i] = sortino(this.assets_data[i]['assets'], this.annual_return[i])
      this.calmar[i] = calmar(this.annual_return[i], this.MDD[i])
    }
      })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    handleSelect() {
      this.selected_accounts = [...this.dialog_selected_accounts];
      this.assets_data = []
      this.all_assets_data.forEach(e => {
        if (this.selected_accounts.includes(e.cookie)) {
          this.assets_data.push(e);
        }
      })     
      this.chart.clear();
      this.initChart();    
        this.log_strategy_assets_data = [];
        for (var i = 0; i < this.assets_data.length; i++) {
            let temp = [];
            for (var j = 0; j < this.assets_data[i]['assets'].length; j++) {
                temp.push(Math.log(this.assets_data[i]['assets'][j]))
            }
            this.log_strategy_assets_data.push(temp);
        }
    /*this.real_strategy_data.forEach(e => {
      this.log_strategy_data.push(Math.log(e));
    })
    this.benchmark_assets.forEach(e => {
      this.log_benchmark_assets.push(Math.log(e));
    })
    this.alpha_assets.forEach(e => {
      this.log_alpha_assets.push(Math.log(e));
    })*/
    this.starttime = 0;
    this.endtime = this.xRe[this.xRe.length - 1]
    /*this.annual_return = annualReturn(this.real_strategy_data);
    this.alpha_annual_return = annualReturn(this.relative_alpha_assets);
    this.volatility = volatility(this.real_strategy_data);
    this.alpha_volatility = volatility(this.alpha_assets);
    this.Sharpe = Sharpe(this.annual_return, this.volatility);
    this.alpha_Sharpe = Sharpe(this.alpha_annual_return, this.alpha_volatility);
    this.MDD = maxDrawDown(this.real_strategy_data);
    this.alphaMDD = maxDrawDown(this.relative_alpha_assets);
    this.sortino = sortino(this.real_strategy_data, this.annual_return);
    this.alpha_sortino = sortino(this.alpha_assets, this.alpha_annual_return);
    this.calmar = calmar(this.annual_return, this.MDD);
    this.alpha_calmar = calmar(this.alpha_annual_return, this.alphaMDD);
    this.getLogValue();*/
    for (var i = 0; i < this.assets_data.length; i++) {
      this.annual_return[i] = annualReturn(this.assets_data[i]['assets']);
      this.alpha_annual_return[i] = annualReturn(this.assets_data[i]['assets_alpha'])
      this.volatility[i] = volatility(this.assets_data[i]['assets'])
      this.Sharpe[i] = Sharpe(this.annual_return[i], this.volatility[i])
      this.MDD [i] = maxDrawDown(this.assets_data[i]['assets'])
      this.sortino[i] = sortino(this.assets_data[i]['assets'], this.annual_return[i])
      this.calmar[i] = calmar(this.annual_return[i], this.MDD[i])
    }
      this.dialogFormVisible = false;
    },
    handleClick() {
      this.value1 = !this.value1;
    },
    initChart() {
      this.chart = echarts.init(document.getElementById(this.id))
      //this.chart2 = echarts.init(document.getElementById(this.id2))
      var vm = this;
      const xData = (function() {
        const data = []
        for (let i = 0; i < vm.xRe.length; i++) {
          data.push(vm.xRe[i]);
          vm.map.set(vm.xRe[i], i);
        }
        /*for (let i = 1; i < 13; i++) {
          //data.push(i + 'month')
        }*/
        return data
      }())
      // below added by xia
      /*const xData = (function() {
        return ['2020-05-07', '20-05-07','2020-05-07', '20-05-07','2020-05-07', '20-05-07','2020-05-07', '20-05-07'];
      })*/
      let options = {
        backgroundColor: '#344b58',
        title: {
          text: '资产',
          x: '45%',
          top: '20',
          textStyle: {
            color: '#fff',
            fontSize: '22'
          },
          subtextStyle: {
            color: '#90979c',
            fontSize: '16'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            textStyle: {
              color: '#fff'
            }
          },
        },
        grid: {
          left: '5%',
          right: '5%',
          borderWidth: 0,
          top: "15%",
          bottom: 95,
          textStyle: {
            color: '#fff'
          }
        },
        legend: {
          x: '10%',
          top: '8%',
          textStyle: {
            color: '#90979c'
          },
          data: []
        },
        calculable: true,
        xAxis: [{
          type: 'category',
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitArea: {
            show: false
          },
          axisLabel: {
            interval: 'auto'
          },
          data: xData
        }],
        yAxis: [{
          scale: true,
          type: 'value',
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#90979c'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            interval: 0,
            formatter: function(value, index) {
              return Math.floor(value * 100) + "%";
            }
          },
          splitArea: {
            show: false
          }
        }],
        dataZoom: [{
          show: true,
          height: 30,
          xAxisIndex: [
            0
          ],
          bottom: 30,
          start: 0,
          end: 100,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '110%',
          handleStyle: {
            color: '#d3dee5'

          },
          textStyle: {
            color: '#fff' },
          borderColor: '#90979c'

        }, {
          type: 'inside',
          show: true,
          height: 15,
          start: 1,
          end: 35
        }],
        series: []
      }
      let i = 0;
      this.assets_data.forEach(e => {
          var c = this.randomColor();
          options.legend.data.push(e['cookie']);
          options.series.push({
          name: e['cookie'],
          type: 'line',
          //stack: 'total',
          symbolSize: 10,
          showSymbol: false,
          symbol: 'circle',
          itemStyle: {
            normal: {
              color: c,
              label: {
                show: false,
                textStyle: {
                  color: c
                },
                position: 'insideTop',
                formatter(p) {
                  return p.value > 0 ? p.value : ''
                }
              }
            }
          },
          data: this.assets_data[i]['assets']
        },)
        i++;
      })      
      this.chart.setOption(options)
      this.chart.on('dataZoom', function (event) {
        var axis = vm.chart.getModel().option.xAxis[0];
        var starttime = axis.data[axis.rangeStart];
        var endtime = axis.data[axis.rangeEnd];
        vm.starttime = starttime;
        vm.endtime = endtime;
        vm.startIndex = vm.map.get(starttime);
        vm.endIndex = vm.map.get(endtime);
        vm.endIndex = vm.assets_data.length - 1;

        if (vm.assets_data_reference_value == []) {
            vm.assets_data_reference_value = [0] * vm.assets_data.length;
        }
        for (var i = 0; i < vm.assets_data.length; i++) {
            vm.assets_data_reference_value[i] = vm.assets_data[i]['assets'][vm.startIndex]
        }
        vm.handle_assets_data_reference_value(vm.assets_data_reference_value);
        /*vm.real_strategy_reference_value = vm.real_strategy_data[vm.map.get(starttime)];
        vm.benchmark_assets_reference_value = vm.benchmark_assets[vm.map.get(starttime)];
        vm.alpha_assets_reference_value = vm.alpha_assets[vm.map.get(starttime)];*/
      })
    },
    handleTableClick() {
      console.log("click");
    },
    getLogValue() {
      this.log_strategy_data = [];
      this.real_strategy_data.forEach(e => {
        this.log_strategy_data.push(Math.log(e));
      })
      this.log_benchmark_assets = [];
      this.benchmark_assets.forEach(e => {
        this.log_benchmark_assets.push(Math.log(e));
      })
      this.log_alpha_assets = [];
      this.alpha_assets.forEach(e => {
        this.log_alpha_assets.push(Math.log(e));
      })
    },
    handle_assets_data_reference_value(val) {
      let temp = [[]]
      var option = this.chart.getOption();
      // 没有对数
      if (this.value1 == false) {
        for (var i = 0; i < this.assets_data.length; i++) {
            temp[i] = [...this.assets_data[i]['assets']]
        }
        for (var i = 0; i < temp.length; i++) {
            for (var j = 0; j < temp[i].length; j++) {
                temp[i][j] = temp[i][j] / val[i];
            }
        }
      }
      else {
        //对数
        /*
        temp = [...this.log_strategy_data];
        //console.log("temp[i]=", temp[this.startIndex]);
        //console.log("this.log_strategy_data[i]=", this.log_strategy_data[this.startIndex]);
        for (var i = this.startIndex; i < this.endIndex; i++) {
          temp[i] = temp[i] - this.log_strategy_data[this.startIndex];
        } */
        temp = [...this.log_strategy_assets_data]
        for (var i = 0; i < temp.length; i++) {
          for (var j = 0; j < temp[i].length; j++) {
            temp[i][j] -= this.log_strategy_assets_data[i][this.startIndex];
          }
        }
      }         
      for(var i = 0; i < temp.length; i++) {
          option.series[i].data =[];
      }
      this.chart.setOption(option, true);   
      for(var i = 0; i < temp.length; i++) {
          option.series[i].data = temp[i];
      }
      option.yAxis[0].min = function(value) {
            return Math.ceil(value.min * 10) / 10 - 0.1;
        }
        option.yAxis[0].max = function(value) {
        return Math.floor(value.max * 10) / 10 + 0.1;
      }
      this.chart.setOption(option, true);    
        
    },
    handle_real_strategy_reference_value(val, oldVal) {
      /*console.log("oldval=" + oldVal);
      console.log("val=" + val);
      console.log("starttime=" + this.starttime);
      console.log("endtime=" + this.endtime);*/
      let temp = []
      var option = this.chart.getOption();
      // 没有对数
      if (this.value1 == false) {
        temp = temp = [...this.real_strategy_data];
        for (var i = 0; i < temp.length; i++) {
          temp[i] = temp[i] / val;
        }
      }
      else {
        //对数
        temp = [...this.log_strategy_data];
        //console.log("temp[i]=", temp[this.startIndex]);
        //console.log("this.log_strategy_data[i]=", this.log_strategy_data[this.startIndex]);
        for (var i = this.startIndex; i < this.endIndex; i++) {
          temp[i] = temp[i] - this.log_strategy_data[this.startIndex];
        }
        
      }            
      option.series[0].data = [];
      this.chart.setOption(option, true);   
      option.series[0].data = temp;
      option.yAxis[0].min = function(value) {
        return Math.ceil(value.min * 10) / 10 - 0.1;
      }
      option.yAxis[0].max = function(value) {
        return Math.floor(value.max * 10) / 10 + 0.1;
      }
      this.chart.setOption(option, true);    
      //console.log("startIndex = ", this.startIndex);
      //console.log("start value = ", this.chart.getOption().series[0].data[this.startIndex]);
      //console.log("series[0]=", this.chart.getOption().series[0].data)
      //console.log(this.xRe);
    },
    handle_benchmark_assets_reference_value(val, oldVal) {
      let temp = [...this.benchmark_assets] 
      // 没有对数
      if (this.value1 == false) {
        for (var i = 0; i < temp.length; i++) {
          temp[i] = temp[i] / val;
        }
      }
      else {
        //对数
        temp = [...this.log_benchmark_assets];
        for (var i = 0; i < temp.length; i++) {
          temp[i] = temp[i] - this.log_benchmark_assets[this.startIndex];
        }
      }   
      let option = this.chart.getOption();
      option.series[1].data = [];
      this.chart.setOption(option, true);   
      option.series[1].data = temp;
      option.yAxis[0].min = function (value) {
        return Math.ceil(value.min * 10) / 10 - 0.1;
      }
      option.yAxis[0].max = function (value) {
        return Math.floor(value.max * 10) / 10 + 0.1
      }
      //console.log(this.chart.getOption().series[0].data);
      this.chart.setOption(option, true);
    },
    handle_alpha_assets_reference_value(val, oldVal) {
      let temp = [...this.alpha_assets] 
      // 没有对数
      if (this.value1 == false) {
        for (var i = 0; i < temp.length; i++) {
          temp[i] = temp[i] / val;
        }
      }
      else {
        //对数
        temp = [...this.log_alpha_assets];
        for (var i = 0; i < temp.length; i++) {
          temp[i] = temp[i] - this.log_alpha_assets[this.startIndex];
        }
      }   
      let option = this.chart.getOption();
      option.series[2].data = [];
      this.chart.setOption(option, true);   
      option.series[2].data = temp;
      option.yAxis[0].min = function (value) {
        return Math.ceil(value.min * 10) / 10 - 0.1;
      }
      option.yAxis[0].max = function (value) {
        return Math.floor(value.max * 10) / 10 + 0.1
      }
      //console.log(this.chart.getOption().series[0].data);
      this.chart.setOption(option, true);
    },
    getAssets() {
      const instance = axios.create({
        baseURL: config.url,
        timeout: 1000,
        headers: {'X-Custom-Header': 'foobar'}
      });
      let vm = this;
      axios.get(config.url + 'assets').then(response => {
        vm.real_strategy_relative_data = vm.real_strategy_data = [...response.data['assets']]
        vm.benchmark_assets = vm.relative_benchmark_assets = [...response.data['assets_bm']]
        vm.alpha_assets = vm.relative_alpha_assets = [...response.data['assets_alpha']]
        vm.xRe = [...response.data['time_index']]
      })
    },
    randomColor() {
        /*var result;
        var count = 0;
        for (var prop in this.colors) {
            var e = Math.random()
            if (e < 1/++count) {
                result = prop;
                return result;
            }   
        }*/
        var r = parseInt(Math.random() * (this.colors.length - 1), 10);
        var re = this.colors[r]
        return re;
    }
  },
  computed: {
    list: function() {
      let startIndex = this.map.get(this.starttime) == null ? 0:this.map.get(this.starttime);
      let endIndex = this.map.get(this.endtime) == null ? this.assets_data.length  - 1:this.map.get(this.endtime);
      this.startIndex = startIndex;
      this.endIndex = endIndex;
      //let strategy_annual_return = calcAnnualReturn(this.real_strategy_data[startIndex], 
      //this.real_strategy_data[endIndex], endIndex - startIndex + 1);
      //let alpha_annual_return = calcAnnualReturn(this.alpha_assets[startIndex], 
      //this.alpha_assets[endIndex], endIndex - startIndex + 1);
      let re = []
      for (let i = 0; i < this.assets_data.length; i++) {
        let annual_return = this.annual_return[i][startIndex][endIndex];
        let strategy_MDD = this.MDD[i][startIndex][endIndex];
        let volatility = this.volatility[i][startIndex][endIndex];
      let Sharpe = this.Sharpe[i][startIndex][endIndex];
      let sortino = this.sortino[i][startIndex][endIndex];
      let calmar = this.calmar[i][startIndex][endIndex];
      let cookie_ = this.assets_data[i]['cookie']
      /*let alpha_annual_return = this.alpha_annual_return[i][startIndex][endIndex];
      
      let alphaMDD = this.alphaMDD[i][startIndex][endIndex];
      */
      re.push({name: cookie_, annual_return: annual_return, MDD: strategy_MDD, volatility: volatility,
      sharpe: Sharpe, sortino: sortino, calmar: calmar});
      }
      return re;
    }
  }
}
</script>

<style scoped>
.table-style {
    background: #344b58!important;
    background-color:#344b58;
    color:#344b58;
    position: relative;
    width: 100%;height: 100px;
}
.switchActive {
  color: #409EFF;
}
.switchInactive {
  color:white;
}
</style>

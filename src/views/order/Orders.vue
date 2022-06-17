<template>
  <div>
    <Header name1="订单管理" name2="订单列表"></Header>
    <el-card>
      <el-button type="warning" @click="addOrderVisitable = true"
        >添加订单</el-button
      >
      <el-table :data="oredrList">
        <el-table-column label="#" type="index"></el-table-column>
        <el-table-column label="订单编号" prop="order_number"></el-table-column>
        <el-table-column label="订单价格" prop="order_price"></el-table-column>
        <el-table-column label="支付状态">
          <template v-slot="scope">
            <el-tag v-if="scope.row.order_pay === 0">未支付</el-tag>
            <el-tag type="success" v-else>已支付</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="是否发货" prop="is_send"></el-table-column>
        <el-table-column label="下单时间">
          <template v-slot="scope">
            {{ scope.row.create_time | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button type="info" size="mini" @click="showLogistics">
              查看物流
            </el-button>
            <el-button
              type="success"
              size="mini"
              @click="showAddress(scope.row.id)"
            >
              修改地址
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog :visible.sync="addOrderVisitable">
      <el-form :model="addform">
        <el-form-item>
          <el-input></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addOrderVisitable = false">取 消</el-button>
        <el-button type="primary" @click="addOrderForm">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog title="查看物流" :visible.sync="LogisticsVisitable">
      <el-timeline :reverse="reverse">
        <el-timeline-item
          v-for="(item, index) in LogisticsList"
          :key="index"
          :timestamp="item.ftime"
        >
          {{ item.context }}
        </el-timeline-item>
      </el-timeline>
      <span slot="footer" class="dialog-footer">
        <el-button @click="LogisticsVisitable = false">取 消</el-button>
        <el-button type="primary" @click="LogisticsVisitable = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      oredrList: [],
      oredrInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      addOrderVisitable: false,
      addform: {},
      editform: {},
      LogisticsVisitable: false,
      LogisticsList: [],
      reverse: false,
    };
  },
  created() {
    this.getOredrList();
  },
  methods: {
    async getOredrList() {
      const { data: res } = await this.$http.get("orders", {
        params: this.oredrInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取订单列表失败");
      }
      this.oredrList = res.data.goods;
    },

    addOrderForm() {
      this.addOrderVisitable = false;
    },
    async showLogistics() {
      const { data: res } = await this.$http.get("/kuaidi/1106975712662");
      if (res.meta.status !== 200) {
        return this.$message.error("获取物流信息失败");
      }
      this.$message.success("获取物流信息成功！");

      this.LogisticsList = res.data;

      this.LogisticsVisitable = true;
    },
    showAddress() {},
  },
};
</script>

<style>
</style>
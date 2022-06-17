<template>
  <div>
    <el-card>
      <Header name1="商品管理" name2="商品列表"></Header>
      <el-button
        type="success"
        @click="addGoodsvis = true"
        style="margin-bottom: 15px"
      >
        添加商品
      </el-button>
      <el-table :data="goodList" border>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column label="商品名称" prop="goods_name"></el-table-column>
        <el-table-column
          label="商品价格(元)"
          prop="goods_price"
        ></el-table-column>
        <el-table-column label="商品状态">
          <template v-slot="scope">
            <el-tag type="success" v-if="scope.row.goods_state === '0'"
              >已付款</el-tag
            >
            <el-tag type="info" v-else>未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="添加时间">
          <template v-slot="scope">
            {{ scope.row.add_time | dataFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              type="primary"
              size="mini"
              @click="editGoodForm(scope.row.goods_id)"
              >编辑</el-button
            >
            <el-button
              type="danger"
              size="mini"
              @click="delGood(scope.row.goods_id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="goodsInfo.pagenum"
        :page-sizes="[1, 5, 10, 15]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <el-dialog :visible.sync="addGoodsvis">
      <el-form :model="addGoodsForm" ref="addFormRef">
        <el-form-item label="商品名称">
          <el-input v-model="addGoodsForm.goods_name"></el-input>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input v-model="addGoodsForm.goods_price"></el-input>
        </el-form-item>
        <el-form-item label="adas">
          <el-input v-model="addGoodsForm.goods_cat"></el-input>
        </el-form-item>
        <el-form-item label="商品数量">
          <el-input v-model="addGoodsForm.goods_number"></el-input>
        </el-form-item>
        <el-form-item label="商品重量">
          <el-input v-model="addGoodsForm.goods_weight"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="addGoodsvis = false">取 消</el-button>
        <el-button type="primary" @click="addGoods">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "Goods",

  data() {
    return {
      goodList: [],
      goodsInfo: {
        query: "",
        pagenum: 1,
        pagesize: 5,
      },
      total: 0,
      addGoodsForm: {
        goods_name: "",
        goods_price: 0,
        // 分类详情数组
        goods_cat: [],
        pics: [],
        // 商品的详情描述
        goods_introduce: "",
        attrs: [],
        goods_number: 0,
        goods_weight: 0,
      },
      addGoodsvis: false,
    };
  },
  created() {
    this.getGoodList();
  },
  methods: {
    async getGoodList() {
      const { data: res } = await this.$http.get("goods", {
        params: this.goodsInfo,
      });
      if (res.meta.status !== 200) {
        return this.$message.error("获取商品列表失败");
      }
      this.$message.success("获取商品列表成功");
      this.goodList = res.data.goods;
      this.total = res.data.total;
    },
    editGoodForm(id) {
      console.log(id);
    },
    async delGood(id) {
      //   console.log(id);
      const confims = await this.$confirm(
        "此操作将永久删除该文件, 是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      ).catch((err) => err);
      if (confims !== "confirm") {
        return this.$message.info("删除操作已取消!");
      }
      const { data: res } = await this.$http.delete(`goods/${id}`);
      if (res.meta.status !== 200) {
        return this.$message.error("删除商品失败");
      }
      this.$message.success("删除商品成功");
      this.getGoodList();
    },
    addGoods() {
      this.$refs.addFormRef.validate(async (valid) => {
        console.log(valid);
        if (!valid) return;
        const { data: res } = await this.$http.post("goods", this.addGoodsForm);
        if (res.meta.status !== 200) {
          return this.$message.error("添加商品失败");
        }
        this.$message.success("添加商品成功");
        this.getGoodList();

        this.addGoodsvis = false;
      });
    },
    handleSizeChange(queSize) {
      this.goodsInfo.pagesize = queSize;
      this.getGoodList();
    },
    handleCurrentChange(queCurrent) {
      this.goodsInfo.pagenum = queCurrent;
      this.getGoodList();
    },
  },
};
</script>

<style>
</style>
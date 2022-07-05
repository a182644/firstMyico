<template>
  <div>
    <Header name1="用户管理" name2="用户列表"></Header>

    <el-card>
      <el-row>
        <el-col :span="8">
          <el-input
            v-model="quInfo.query"
            placeholder="请输入查询内容"
            @clear="getUserList"
          >
            <el-button
              slot="append"
              icon="el-icon-search"
              @click="getUserList"
            ></el-button
          ></el-input>
        </el-col>

        <el-col :span="12"
          ><el-button
            type="success"
            style="margin-left: 50px"
            @click="addFormvisible = true"
            >添加用户</el-button
          ></el-col
        >
      </el-row>
      <el-table :data="userList" border stripe>
        <el-table-column type="index" label="#"></el-table-column>
        <el-table-column
          label="用户名称"
          prop="username"
          width="100px"
        ></el-table-column>
        <el-table-column
          label="用户电话"
          prop="mobile"
          width="150"
        ></el-table-column>
        <el-table-column
          label="邮箱"
          prop="email"
          width="150"
        ></el-table-column>
        <el-table-column
          label="用户角色"
          prop="role_name"
          width="150"
        ></el-table-column>
        <el-table-column label="用户状态" width="100px">
          <template v-slot="scope">
            <el-switch
              v-model="scope.row.mg_state"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="ChangeState(scope.row)"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template v-slot="scope">
            {{ scope.row.create_time | dataFormat }}
          </template>
        </el-table-column>

        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              size="mini"
              type="primary"
              icon="el-icon-edit"
              @click="eidtFormShow(scope.row.id)"
              >编辑</el-button
            >
            <el-tooltip content="分配角色" placement="top" effect="light">
              <el-button
                size="mini"
                type="warning"
                icon="el-icon-share"
                @click="roulesVisibleShow(scope.row)"
              >
                >分配角色</el-button
              >
            </el-tooltip>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              @click="delUser(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="quInfo.pagenum"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="quInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>

    <el-dialog
      :visible.sync="addFormvisible"
      title="添加用户"
      width="30%"
      @close="addClose"
    >
      <el-form :model="addUserForm" ref="addUserRef" :rules="addrules">
        <el-form-item label="用户名:" prop="username">
          <el-input
            v-model="addUserForm.username"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item label="密码:" prop="password">
          <el-input
            v-model="addUserForm.password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱:" prop="email">
          <el-input
            v-model="addUserForm.email"
            placeholder="请输入邮箱"
          ></el-input>
        </el-form-item>
        <el-form-item label="电话:" prop="mobile">
          <el-input
            v-model="addUserForm.mobile"
            placeholder="请输入电话"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addFormvisible = false">取 消</el-button>
        <el-button type="primary" @click="addForm">确 定</el-button>
      </span>
    </el-dialog>
    <!-- //分配角色 -->
    <el-dialog title="分配角色" :visible.sync="rolesVisible">
      <p>当前用户名 ：&nbsp;&nbsp;{{ userInfo.username }}</p>
      <p>当前的角色 : &nbsp;&nbsp;{{ userInfo.role_name }}</p>
      <p>
        aaaa:
        <el-select v-model="selectId" placeholder="请选择">
          <el-option
            v-for="item in rolesList"
            :key="item.id"
            :label="item.roleName"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </p>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rolesVisible = false">取 消</el-button>
        <el-button type="primary" @click="rolesFormSubmit">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog :visible.sync="editvisible" @close="editClose">
      <el-form title="修改用户信息" :model="editForm" ref="editFormRef">
        <el-form-item label="用户名">
          <el-input v-model="editForm.username" disabled></el-input>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="editForm.mobile"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="editForm.email"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editvisible = false">取 消</el-button>
        <el-button type="primary" @click="editFormSubmit">确 定</el-button>
      </span></el-dialog
    >
  </div>
</template>

<script>
import { Userverification } from "@/components/Conpoll/Rules/rules.js";
export default {
  name: "User",
  mixins: [Userverification],
  data() {
    return {
      quInfo: {
        query: "",
        pagenum: 1,
        pagesize: 10,
      },
      userList: [],
      total: "",
      seachipt: "",
      addUserForm: {
        username: "",
        mobile: "",
        email: "",
        password: "",
      },
      addFormvisible: false,
      userInfo: {},
      editvisible: false,

      editForm: [],
      rolesVisible: false,
      rolesList: [],
      selectId: "",
      currentPage4: 4,
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    async getUserList() {
      const { data: res } = await this.$http.get("users", {
        params: this.quInfo,
      });
      if (res.meta.status !== 200) {
        return this.$messages.error("获取用户列表失败");
      }
      this.$message.success("获取用户列表成功");
      this.userList = res.data.users;
      this.total = res.data.total;
      // this.getUserList();
    },
    addForm() {
      this.$refs.addUserRef.validate(async (vaild) => {
        if (!vaild) {
          return;
        }
        const { data: res } = await this.$http.post("users", this.addUserForm);
        if (res.meta.status !== 201) {
          return this.$message.error("添加用户失败");
        }
        this.$message.success("添加用户成功");
        this.addFormvisible = false;
        this.getUserList();
      });
    },
    async ChangeState(userInfo) {
      const { data: res } = await this.$http.put(
        `users/${userInfo.id}/state/${userInfo.status}`
      );
      if (res.meta.status !== 200) {
        userInfo.mg_state = !userInfo.mg_state;
        return this.$message.error("更新用户状态失败!");
      }
      return this.$message.success("更新用户状态成功!");
    },
    // 根据id获取当前行用户数据
    async eidtFormShow(id) {
      const { data: res } = await this.$http.get(`users/${id}`);
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户信息失败");
      }
      this.editvisible = true;
      this.editForm = res.data;
    },
    // 提交用户修改
    editFormSubmit() {
      this.$refs.editFormRef.validate(async (vaild) => {
        if (!vaild) {
          return;
        }
        const { data: res } = await this.$http.put(
          `users/${this.editForm.id}`,
          this.editForm
        );
        if (res.meta.status !== 200) {
          return this.$message.error("修改用户信息失败");
        }
        this.$message.success("修改用户信息成功");
        this.editvisible = false;
        this.getUserList();
      });
    },
    //删除用户
    delUser(id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        roundButton: true,
      })
        .then(() => {
          this.$http.delete(`users/${id}`).then((res) => {
            const { data: response } = res;
            if (response.meta.status !== 200) {
              return this.$message.error("删除用户失败");
            }
            this.$message.success("删除用户成功");
            this.getUserList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },

    //获取当前用户角色
    async roulesVisibleShow(userInfo) {
      this.userInfo = userInfo;
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取用户角色失败");
      }
      this.$message.success("成功");
      this.rolesList = res.data;
      this.rolesVisible = true;
    },
    //提交分配角色
    rolesFormSubmit() {
      this.$http
        .put(`users/${this.userInfo.id}/role`, {
          rid: this.selectId,
        })
        .then((res) => {
          const { data: response } = res;
          if (response.meta.status !== 200) {
            return this.$message.error("分配角色失败");
          }
          this.$message.success("分配角色成功");
          this.rolesVisible = false;
          this.getUserList();
        });
    },

    handleSizeChange(newSize) {
      this.quInfo.pagesize = newSize;
      this.getUserList();
    },
    handleCurrentChange(newCurrent) {
      this.quInfo.pagenum = newCurrent;
      this.getUserList();
    },

    addClose() {
      this.$refs.addUserRef.resetFields();
    },
    editClose() {
      this.$refs.editFormRef.resetFields();
    },
  },
};
</script>

<style>
</style>
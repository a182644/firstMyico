<template>
  <div>
    <Header name1="权限管理" name2="角色列表"></Header>
    <el-card>
      <el-button type="warning" @click="rolesVisible = true"
        >添加角色</el-button
      >

      <el-table :data="roleList" border stripe>
        <el-table-column type="expand">
          <template v-slot="scope">
            <el-row
              v-for="(item, i1) in scope.row.children"
              :key="item.id"
              :class="['bdbottom', i1 === 0 ? 'bdtop' : '', 'vcenter']"
            >
              <el-col :span="5">
                <el-tag closable @close="removeAuthName(scope.row, item.id)">
                  {{ item.authName }}
                  <i class="el-icon-caret-right"></i>
                </el-tag>
              </el-col>
              <el-col :span="19">
                <el-row v-for="item1 in item.children" :key="item1.id">
                  <el-col :span="8">
                    <el-tag
                      type="warning"
                      closable
                      @close="removeAuthName(scope.row, item1.id)"
                    >
                      {{ item1.authName }}
                      <i class="el-icon-caret-right"></i>
                    </el-tag>
                  </el-col>
                  <el-col :span="16">
                    <el-tag
                      type="danger"
                      v-for="item2 in item1.children"
                      :key="item2.id"
                      closable
                      @close="removeAuthName(scope.row, item2.id)"
                    >
                      {{ item2.authName }}
                    </el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column label="角色名称" prop="roleName"></el-table-column>
        <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
        <el-table-column label="操作">
          <template v-slot="scope">
            <el-button
              type="info"
              size="small"
              @click="showEditRoles(scope.row.id)"
              >编辑</el-button
            >
            <el-button
              type="warning"
              size="small"
              @click="showDisVisitable(scope.row)"
              >分配角色</el-button
            >
            <el-button
              type="danger"
              icon="el-icon-delete"
              size="small"
              @click="DelRoles(scope.row.id)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!-- <Pages
        v-show="total > 0"
        :total="total"
        :page.sync="form.pageNum"
        :limit.sync="form.pageSize"
        @pagination="getRoleList(form)"
      ></Pages> -->

      <!-- <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage4"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      >
      </el-pagination> -->
    </el-card>
    <el-dialog :visible.sync="rolesVisible">
      <el-form :model="addRolesList" ref="addref">
        <el-form-item label="角色名称">
          <el-input v-model="addRolesList.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="addRolesList.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="rolesVisible = false">取 消</el-button>
        <el-button type="primary" @click="addRoles">确 定</el-button>
      </span>
    </el-dialog>

    <el-dialog
      title="编辑角色信息"
      :visible.sync="eidtRolesVisible"
      :close-on-click-modal="false"
    >
      <el-form :model="editRolesList" ref="editref">
        <el-form-item label="角色名称">
          <el-input v-model="editRolesList.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="editRolesList.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="eidtRolesVisible = false">取 消</el-button>
        <el-button type="primary" @click="editRoles">确 定</el-button>
      </span></el-dialog
    >

    <el-dialog :visible.sync="DisVisitable">
      <el-tree
        :props="treeProps"
        :load="loadNode"
        lazy
        show-checkbox
        @check-change="handleCheckChange"
      >
      </el-tree>

      <span slot="footer" class="dialog-footer">
        <el-button @click="DisVisitable = false">取 消</el-button>
        <el-button type="primary" @click="editDis">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import Pages from "@/components/Conpoll/Page/Pages.vue";

export default {
  name: "Roles",
  components: {
    Pages,
  },
  data() {
    return {
      roleList: [],
      treeProps: {
        children: "children",
        label: "authName",
      },
      rolesVisible: false,
      addRolesList: {
        roleName: "",
        roleDesc: "",
        authids: [],
      },
      editRolesList: {},
      eidtRolesVisible: false,
      DisVisitable: false,

      // form: {
      //   pageNum: 1,
      //   pageSize: 10,
      // },
      total: 100,
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      const { data: res } = await this.$http.get("roles");
      if (res.meta.status !== 200) {
        return this.$message.error("获取角色列表失败");
      }
      this.$message.success("获取角色列表成功");
      this.roleList = res.data;
    },
    async removeAuthName(roles, id) {
      this.$confirm("此操作将永久删除该用户, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
        roundButton: true,
      })
        .then(() => {
          this.$http.delete(`roles/${roles.id}/rights/${id}`).then((res) => {
            const { data: response } = res;
            if (response.meta.status !== 200) {
              return this.$message.error("删除用户失败");
            }
            this.$message.success("删除用户成功");
            // this.getRoleList();
            roles.children = response.data;
            // console.log(roles.children);
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    addRoles() {
      this.$refs.addref.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.post("roles", this.addRolesList);
        if (res.meta.status !== 201) {
          return this.$message.error("添加角色失败");
        }
        this.$message.success("添加角色成功");
        this.getRoleList();
        this.rolesVisible = false;
      });
    },
    showEditRoles(id) {
      this.editRolesList = this.roleList.find((item) => item.id === id);
      this.eidtRolesVisible = true;
    },
    editRoles() {
      this.$refs.editref.validate(async (valid) => {
        if (!valid) {
          return;
        }
        const { data: res } = await this.$http.put(
          `roles/${this.editRolesList.id}`,
          this.editRolesList
        );
        if (res.meta.status !== 200) {
          return this.$message.error("编辑角色失败");
        }
        this.$message.success("编辑角色成功");
        this.getRoleList();
        this.eidtRolesVisible = false;
      });
    },
    editDis() {},
    DelRoles(id) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          // this.$message({
          //   type: "success",
          //   message: "删除成功!",
          // });
          this.$http.delete(`roles/${id}`).then((res) => {
            const { data: response } = res;
            if (response.meta.status !== 200) {
              return this.$message.error("删除角色失败");
            }
            this.$message.success("删除角色成功");
            this.getRoleList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    handleCheckChange() {},
    loadNode() {},
    showDisVisitable(id) {
      this.DisVisitable = true;
    },
  },
};
</script>

<style scoped>
.el-tag {
  margin: 10px;
}
.bdtop {
  border-top: 1px solid #ccc;
}
.bdbottom {
  border-bottom: 1px solid #eee;
}
.vcenter {
  display: flex;
  align-items: center;
}
</style>
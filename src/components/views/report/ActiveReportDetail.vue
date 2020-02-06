<template>
  <div class="container">
    <div class="filter p10">
      <ul class="left">
        <li>
          <span>会员账号</span>
          <Input class="w100" />
        </li>
        <li>
          <span>会员ID</span>
          <Input class="w100" />
        </li>
        <li>
          <span>日期范围</span>
          <Date v-model="filter.dates[0]" />
          <span class="ph5">~</span>
          <Date v-model="filter.dates[1]" />
        </li>
        <li>
          <button class="btn-blue">查询</button>
          <button class="btn-blue" @click="exportExcel()">导出Excel</button>
        </li>
      </ul>
    </div>
    <div class="table">
      <Table :headers="headers" :column="list">
        <template v-slot:item="{row}">
          <td>{{row.a1}}</td>
          <td>{{row.a2}}</td>
          <td>{{row.a3}}</td>
          <td>{{row.a4}}</td>
          <td>{{row.a5}}</td>
        </template>
      </Table>
    </div>
    <Page
      class="table-page"
      :total="total"
      :pageNo.sync="pageNo"
      :pageSize.sync="pageSize"
      @updateNo="updateNo"
      @updateSize="updateSize"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      filter: {
        dates: []
      },
      headers: ["会员账号", "会员ID", "活动类型", "领取金额", "领取时间"],
      list: [
          {
              a1: '1',
          }
      ],
      total: 100,
      pageNo: 1,
      pageSize: 25
    };
  },
  methods: {
    exportExcel() {
      import("../../../js/config/Export2Excel").then(excel => {
        const tHeader = this.headers;
        const data = this.list.map(item => {
          return [item.a1, item.a2, item.a3, item.a4, item.a5];
        });
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: excel,
          autoWidth: true,
          bookType: "xlsx"
        });
      });
    },
    updateNo(val) {},
    updateSize(val) {}
  },
  mounted() {}
};
</script>
<style scoped>
.table {
  margin-top: 20px;
}
</style>
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import dayjs from 'dayjs';

const styles = StyleSheet.create({
  page: { padding: 30 },
  title: { fontSize: 18, marginBottom: 20, fontWeight: 'bold', textAlign: 'center' },
  table: { display: 'table', width: 'auto', borderStyle: 'solid', borderWidth: 1, borderRightWidth: 0, borderBottomWidth: 0 },
  tableRow: { flexDirection: 'row' },
  tableColHeader: { width: '25%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, backgroundColor: '#f0f0f0', padding: 4 },
  tableCol: { width: '25%', borderStyle: 'solid', borderWidth: 1, borderLeftWidth: 0, borderTopWidth: 0, padding: 4 },
  tableCellHeader: { fontSize: 12, fontWeight: 'bold' },
  tableCell: { fontSize: 10 },
});

const parseAmount = (val) => {
  if (val == null) return 0;
  if (typeof val === 'number') return val;
  const cleaned = String(val).replace(/[^0-9.-]+/g, '');
  const n = parseFloat(cleaned);
  return Number.isFinite(n) ? n : 0;
};

const formatCurrency = (num) => {
  return `₱${Number(num).toLocaleString('en-PH', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
const OrderReportPDF = ({ orders = [] }) => {
  const deliveredOrders = orders.filter(order => order.status === 'delivered');
  const grandTotal = deliveredOrders.reduce((sum, o) => sum + Number(o.total_amount), 0);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>Delivered Orders Report</Text>

        <View style={styles.table}>
          {/* Header */}
          <View style={styles.tableRow}>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Order ID</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Date</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Status</Text></View>
            <View style={styles.tableColHeader}><Text style={styles.tableCellHeader}>Total (₱)</Text></View>
          </View>

          {/* Rows */}
          {deliveredOrders.map((order, idx) => (
            <View style={styles.tableRow} key={order.id || idx}>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{order.id}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{dayjs(order.order_date).format("MMM DD, YYYY hh:mm A")}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{order.status}</Text></View>
              <View style={styles.tableCol}><Text style={styles.tableCell}>{formatCurrency(parseAmount(order.total_amount))}</Text></View>
            </View>
          ))}

          {/* Summary row */}
          <View style={styles.tableRow}>
            <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCell}></Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCellHeader}>Grand Total</Text></View>
            <View style={styles.tableCol}><Text style={styles.tableCellHeader}>₱{formatCurrency(grandTotal)}</Text></View>
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default OrderReportPDF;
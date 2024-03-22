const Widget = ({ type }) => {
  let data;

  const amount = 100;
  const diff = 20;

  switch (type) {
    case "user":
      data = {
        title: "USERS",
        isMoney: false,
        link: "See all users",
        icon: (
          <span className="icon text-crimson bg-red-200 rounded-full p-1">
            U
          </span>
        ),
      };
      break;
    case "order":
      data = {
        title: "ORDERS",
        isMoney: false,
        link: "View all orders",
        icon: (
          <span className="icon bg-gold-200 text-goldenrod rounded-full p-1">
            O
          </span>
        ),
      };
      break;
    case "earning":
      data = {
        title: "EARNINGS",
        isMoney: true,
        link: "View net earnings",
        icon: (
          <span className="icon bg-green-200 text-green rounded-full p-1">
            E
          </span>
        ),
      };
      break;
    case "balance":
      data = {
        title: "BALANCE",
        isMoney: true,
        link: "See details",
        icon: (
          <span className="icon bg-purple-200 text-purple rounded-full p-1">
            B
          </span>
        ),
      };
      break;
    default:
      break;
  }

  return (
    <div className="widget flex justify-between items-center p-4 border border-gray-300 rounded-lg">
      <div className="left">
        <span className="title">{data.title}</span>
        <span className="counter">
          {data.isMoney && "$"} {amount}
        </span>
        <span className="link">{data.link}</span>
      </div>
      <div className="right flex items-center">
        <div className="percentage positive flex items-center">
          <span className="text-green-500">▲</span>
          {diff} %
        </div>
        {data.icon}
      </div>
    </div>
  );
};

export default Widget;

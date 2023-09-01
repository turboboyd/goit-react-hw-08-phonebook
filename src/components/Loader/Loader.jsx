import { Bars } from 'react-loader-spinner';
export default function Loader() {
  return (
    <div
      style={{
        position: 'absolute',
        bottom: '50%',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    >
      <Bars
        height={80}
        width={80}
        color="#4fa94d"
        ariaLabel="bars-loading"
        visible={true}
      />
    </div>
  );
}

"""ETL stub script.
환경변수 ETL_SOURCE_URI / ETL_TARGET_URI를 받아 배치 적재 로직을 구현할 위치.
"""

import os


def main() -> None:
    source = os.getenv('ETL_SOURCE_URI')
    target = os.getenv('ETL_TARGET_URI')
    print(f'ETL stub: source={bool(source)} target={bool(target)}')


if __name__ == '__main__':
    main()
